import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";


export default function SocialBtns() {
    const supabase = createClientComponentClient();
  const { toast } = useToast();

  const githubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  const googleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

    return (
        <div>
            <div className='mt-3'>
                <Button variant="outline" className='w-full' onClick={googleLogin}>
                    <Image src="/images/google.png" width={22} height={22} alt="google_logo" className='mr-2' />
                    Continue with Google
                </Button>
            </div>
            <div className='mt-2'>
                <Button variant="outline" className='w-full' onClick={githubLogin}>
                    <Image src="/images/github.png" width={30} height={30} alt="github_logo" className='mr-2' />
                    Continue with GitHub
                </Button>
            </div>
        </div>
    );
}
