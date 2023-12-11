/// This class's implementation is based on 
/// Felipe Gavilán - Building Applications with Angular 11 and ASP.NET Core 5
/// The repository of this project: https://github.com/gavilanch/Angular-And-ASP.NET-Core/tree/main/

using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;

namespace WebAPI.Helpers
{
    public class TypeBinder<T> : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var propertyName = bindingContext.ModelName;
            var value = bindingContext.ValueProvider.GetValue(propertyName);

            if(value == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }
            else
            {
                try
                {
                    var deserializedObject = JsonConvert.DeserializeObject<T>(value.FirstValue);

                    bindingContext.Result = ModelBindingResult.Success(deserializedObject);
                }
                catch
                {
                    bindingContext.ModelState.TryAddModelError(propertyName, "Type of the value is not correct!");
                }
                return Task.CompletedTask;
            }
        }
    }
}
