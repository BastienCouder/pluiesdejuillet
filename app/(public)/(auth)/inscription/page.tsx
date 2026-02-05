import { SignupForm } from "@/app/(public)/(auth)/inscription/_components/signup-form";

export default function Page() {
    return (
        <div className="flex flex-1 w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignupForm />
            </div>
        </div>
    );
}