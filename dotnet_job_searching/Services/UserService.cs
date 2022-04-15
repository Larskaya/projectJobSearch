using Microsoft.AspNetCore.Mvc;

using job_searching.Repositories;
using job_searching.Requests;

namespace job_searching.Services;
public class UserService 
{
    private readonly IUserRepository userRepository;
    public UserService(IUserRepository userRepository) 
    {
        this.userRepository = userRepository;
    }
    // public async Task<int> Register(String login, String email, String password)
    public async Task<int> Register(RegisterRequest registerRequest)
    {
        Task<bool> byLogin = userRepository.ExistanceByLogin(registerRequest.Login);
        Task<bool> byEmail = userRepository.ExistanceByEmail(registerRequest.Email);

        bool loginAlreadyExists = await byLogin;
        bool emailAlreadyExists = await byEmail;

        if (!loginAlreadyExists && !emailAlreadyExists) 
        {
            return StatusCodes.Status200OK;
        }
        else 
        {
            return StatusCodes.Status403Forbidden;
        }
    }
}