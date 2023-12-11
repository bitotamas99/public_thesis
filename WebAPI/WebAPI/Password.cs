using System.Runtime.Intrinsics.Arm;
using System.Security.Cryptography;
using System.Text;

namespace WebAPI
{
    public static class Password
    {
        public static string hashPassword(string password)
        {
            SHA256 sha256 = SHA256.Create();

            var passwordBytes = Encoding.UTF8.GetBytes(password);
            var hashedBytes = sha256.ComputeHash(passwordBytes);

            return Convert.ToBase64String(hashedBytes);
        }
    }
}
