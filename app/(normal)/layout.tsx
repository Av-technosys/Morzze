import Header from "@/components/commom/header"
import Footer from "@/components/commom/footer"
export default function Layout({ children }: {
    children: React.ReactNode
}) {
    return <>
        <Header />
        {children}
        <Footer />
    </>
}