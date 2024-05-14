import React from 'react'

const Navbar = () => {
    return (
        <header className="text-gray-600 body-font items-center">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <span className="ml-3 text-xl">TaskVault</span>
                </a>
            </div>
        </header>
    )
}

export default Navbar