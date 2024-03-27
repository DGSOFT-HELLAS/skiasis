
import { Nav } from "./nav"
import './styles.css'
export default function DashboardLayout({children}) {
    return (
        <section className="dash_wrapper">
            <Nav />
            <section className="dash_content">
                <main className="main">{children}</main>
            </section>
        </section>
    )
}