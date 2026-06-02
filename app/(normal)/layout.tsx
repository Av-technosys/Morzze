import Header from "@/components/commom/header"
import Footer from "@/components/commom/footer"
import { getCategories } from "@/helper/category/action"
import FloatingWhatsappButton from "@/components/Whatsapp_Button/FloatingWhatsappButton";

export default async function Layout({ children }: {
    children: React.ReactNode
}) {

    return <>
        <Header />
        {children}
        <Footer />
        <FloatingWhatsappButton />
    </>
}