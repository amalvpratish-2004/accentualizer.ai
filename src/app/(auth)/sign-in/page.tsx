import SignInView from "@/modules/auth/views/sign-in-view";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if(session?.user) {
        redirect('/dashboard');
    }

    return(
        <SignInView />
    )
}

export default Page;