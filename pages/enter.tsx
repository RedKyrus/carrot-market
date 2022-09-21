import { useState } from "react";


export default function Enter(){
    const [method, setMethod] = useState<"email" | "phone">("email");
    const onEmailClick = () => setMethod("email");
    const onPhoneClick = () => setMethod("phone");
    return (
      <div>

      </div>
    )
}