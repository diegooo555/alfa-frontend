interface LinkProps {
    href: string,
    content: string,
}

const Link = (props: LinkProps) => {
    const {href, content} = props;
    return(
        <a href={href} className="itim-regular text-white text-xl font-bold no-underline p-3 hover:scale-110">{content}</a>
    )
}

function MenuTaskPage(){
    return(
        <nav className="flex items-center justify-around absolute rounded-md w-full max-sm:hidden z-10">
            <a href="./" className="hover:scale-105">
                <img src="/wolf.png" alt="logo Alfa" width="100px" height="100px"/>
            </a>

            <Link href="/#" content="INICIO"/>
            <Link href="/#/tasks" content="TASKS"/>
            <Link href="./" content="FINANCE"/>
            <Link href="./" content="COMPANYS"/>
            <Link href="./" content="PROJECTS"/>

        </nav>
    )
}

export default MenuTaskPage;