import { useForm } from "react-hook-form"


export default function Forme(){
  const {register, handleSubmit} = useForm();
  const onValid = () =>{
    console.log("베리 굿~");
  }
  return(
    <form onSubmit={handleSubmit(onValid)}>
      <input
        {...register("Username",{required:"true"})}
        type="text" placeholder="Username" required
      />
      <input
        {...register("email",{required:"true"})}
        type="email" placeholder="Email" required
      />
      <input 
        {...register("password",{required:"true"})}
        type="password" placeholder="Password" required
      />
      <button type="submit" value="Create Account"></button>
    </form>
  )
}