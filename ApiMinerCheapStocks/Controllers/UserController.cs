using ApiMinerCheapStocks.DTOs;
using ApiMinerCheapStocks.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics.Eventing.Reader;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiMinerCheapStocks.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        public UserController(UserManager<ApplicationUser> userManager, 
            SignInManager<ApplicationUser> signInManager, 
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        private UserTokenResponse GetAuthenticateTokenUser(UserRequest request)
        {
            List<Claim> authClaims = new()
            {
                new Claim(ClaimTypes.NameIdentifier, request.Email),
                new Claim(ClaimTypes.Role, "User"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Aud, _configuration["JWT:ValidAudience"]),
                new Claim(JwtRegisteredClaimNames.Iss, _configuration["JWT:ValidIssuer"])
            };

            var authSignInKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            var authSignInCredential = new SigningCredentials(authSignInKey, SecurityAlgorithms.HmacSha256);
            DateTime expiration = DateTime.Now.AddHours(6);

            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                expires: expiration,
                claims: authClaims,
                signingCredentials: authSignInCredential
                );

            UserTokenResponse tokenResponse = new ()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration,
            };

            return tokenResponse;
        }

        [HttpPost("register")]
        [ProducesResponseType(201)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateUserAsync([FromBody] UserRequest request)
        {
            ApplicationUser user = new() { UserName = request.Email, Email = request.Email };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
                return this.Created("user", request.Email);
            else
                return BadRequest(result);
        }

        [HttpPost("login")]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<UserTokenResponse>> LoginAsync([FromBody] UserRequest request)
        {
            var result = await _signInManager.PasswordSignInAsync(request.Email, 
                request.Password,
                isPersistent: false,
                lockoutOnFailure: false);

            if (result.Succeeded)
                return GetAuthenticateTokenUser(request);
            else
                return BadRequest("login incorrect!");
                
        }
    }
}
