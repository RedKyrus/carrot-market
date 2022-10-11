import { useDebugValue } from "react";
import { FieldErrors, useForm } from "react-hook-form"


interface LoginForm{
  username: string;
  password: string;
  email: string;
}


export default function Forme(){
  const {
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    mode: "onChange"
  });

  const onValid = (data:LoginForm) =>{
    console.log("베리 굿~");
  }
  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  }

  return(
    <form onSubmit={handleSubmit(onValid, onInValid)  }>
      <input
        {...register("username",{
          required:"Username is required",
          minLength: {
            value: 5,
            message: "테스트"
          }
          })}
        type="text" placeholder="Username"
      />
      
      <input
        {...register("email",{
          required:"Email is required",
          validate:{
            notGmail: (value) =>
              !value.includes("@gmail.com") || "Gmail is not allowed"
          }
        })}
        type="email" placeholder="Email"
        className={`${Boolean(errors.email) ? "focus:ring-transparent border-red-500 focus:border-red-500" : ""}`}
      />
      {errors.email?.message}

      <input 
        {...register("password",{required:"Password is required"})}
        type="password" placeholder="Password" autoComplete="true"
      />
      <button type="submit" value="">Create Account</button>
    </form>
  )
}