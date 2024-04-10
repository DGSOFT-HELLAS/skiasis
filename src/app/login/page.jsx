import LoginForm from "@/app/_components/LoginForm";
import Image from "next/image";

export const metadata = {
    title: "Authentication",
    description: "Authentication forms built using the components.",
}




export default function Login() {

 
    return (
        <div className="auth_container">
           
            <div className="auth_form_container">
            <div className="auth_image">
                <Image src="/newlogo.png" width={150} height={70} />
            </div>
                <div className="register_text">
                    {/* <h1>Καλώς Ορίσατε!</h1> */}
                    <p>Συνδεθείτε στον λογαριασμό σας</p>
                </div>
                <LoginForm />
                
            </div>
        </div>
    )
}