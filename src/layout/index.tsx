const Layout = (props:any) => {
    return (
        <div>
            <header className="bg-gray-900">
                <div className="mx-auto py-6 px-4 ">
                    <h1 className="text-white font-bold text-3xl">ResTable</h1>
                </div>
            </header>
            <main>
                <div className="bg-gray-800 mx-auto py-6" >
                    {props.children}
                </div>
            </main>
        </div>
    );
}

export default Layout;