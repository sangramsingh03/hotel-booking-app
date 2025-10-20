import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const location = useLocation();
    
    const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast( { message: "Sign-in complete!", type: "SUCCESS" });
            await queryClient.invalidateQueries("validateToken");
            navigate(location.state?.from?.pathname || "/");
        },
        onError: (error: Error) => {
            showToast( { message: error.message, type: "ERROR" });
        },
    });

    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data);
    })

    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}
        >
            <h2 className="text-3xl font-bold">Sign in</h2>

            <label className="w-full max-w-[400px] text-gray-700 text-[1rem] font-bold flex-1"
            >
                    Email
                    <input 
                        type="email"
                        className="border rounded w-full py-2 px-2 font-normal rounded-[1rem]"
                        {...register("email", { required: "This field is required "})}
                    ></input>
                    {errors.email && (<span className="text-red-500">{errors.email.message}</span>)}
            </label>
            <label className="w-full max-w-[400px] text-gray-700 text-[1rem] font-bold flex-1"
            >
                    Password
                    <input 
                        type="password"
                        className="border rounded w-full py-2 px-2 font-normal rounded-[1rem]"
                        {...register("password", { 
                            required: "This field is required ",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                    ></input>
                    {errors.password && (<span className="text-red-500">{errors.password.message}</span>)}
            </label>
            <span className="flex items-center justify-between"
                  style={{gap: "1rem"}}
            >
                <button 
                    type="submit"
                    className="bg-blue-600 text-white px-[1.5rem] py-[0.5rem] font-bold hover:bg-blue-500 text-xl rounded-[1rem]"
                >
                    Login
                </button>
            </span>
            <div className="text-[1rem]">
                    Not Registered? 
                    <Link className="underline" 
                    to="/register"
                    >
                        Create an account here
                    </Link>
            </div>
        </form>
    );
};

export default SignIn;
