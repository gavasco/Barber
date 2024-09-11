import { UserContextProvider } from "./UserContext";

type Props = {
    children: React.ReactNode;
}

export function Providers ({ children }: Props) {
    return (
        <UserContextProvider>
            {children}
        </UserContextProvider>
    )
}