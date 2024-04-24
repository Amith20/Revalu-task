import './navbar.css'

function NavBar() {
  return (
    <div className="navbar">
        <div className="logo">
            {/* <img src="" alt="" id="logoIcon"/> */}
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.9611 19.1396C30.1653 20.4508 29.5522 21.7862 28.4236 22.4837C27.5986 22.9936 26.3966 23.2469 24.7669 22.4561C23.3569 21.773 22.0583 20.4585 20.9148 19.2991C20.6013 18.9812 20.2995 18.6755 20.013 18.3974C19.5721 17.9763 19.0125 18.0834 18.6825 18.4095C18.3569 18.7312 18.2415 19.2869 18.6549 19.7317C18.949 20.0452 19.2746 20.379 19.6201 20.7283C20.7995 21.9236 22.1339 23.274 22.7973 24.6916C23.566 26.3284 23.2923 27.5248 22.7647 28.3426C22.045 29.4579 20.7007 30.0522 19.3938 29.8226C18.3988 29.6482 17.2664 29.0081 16.6339 27.1777C16.1218 25.7004 16.1334 23.854 16.1416 22.2255C16.1455 21.7768 16.1494 21.3436 16.1416 20.9469C16.1295 20.3393 15.6571 20.0176 15.1963 20.0137H15.1886C14.7316 20.0137 14.2592 20.3277 14.2393 20.927C14.2233 21.3596 14.2195 21.8243 14.2156 22.3132C14.2079 23.993 14.1919 25.8952 13.6599 27.3686C13.0042 29.1864 11.8613 29.8055 10.8602 29.9611C9.54951 30.1653 8.21342 29.5522 7.51585 28.4237C7.00592 27.5987 6.75261 26.3968 7.54344 24.7672C8.22666 23.3573 9.54123 22.0588 10.7007 20.9154C11.0186 20.6014 11.3243 20.3001 11.6025 20.0137C12.0236 19.5728 11.9159 19.0132 11.5903 18.6832C11.4154 18.5044 11.1693 18.3891 10.9071 18.3891C10.6924 18.3891 10.47 18.4686 10.2719 18.6512C9.95403 18.9454 9.6207 19.2748 9.27522 19.6164C8.07986 20.7957 6.72556 22.1339 5.3078 22.7972C3.82271 23.4947 2.70075 23.333 1.89501 22.9026C0.563336 22.1913 -0.137545 20.6268 0.225036 19.1617C0.456272 18.2274 1.13177 17.2176 2.82161 16.6343C4.30284 16.1222 6.14555 16.1337 7.77799 16.142C8.22666 16.1459 8.65547 16.1498 9.05282 16.142C9.66043 16.1299 9.98217 15.6537 9.98604 15.1967C9.9899 14.7359 9.67644 14.2597 9.07269 14.2398C8.64002 14.2238 8.17534 14.22 7.68251 14.2161C6.00647 14.204 4.10416 14.1924 2.63066 13.6604C0.812231 13.0048 0.193579 11.8614 0.0385025 10.8604C-0.164587 9.55033 0.448546 8.21765 1.57547 7.51902C2.39997 7.00747 3.60196 6.75252 5.23219 7.54441C6.64223 8.22758 7.94079 9.54206 9.08428 10.7015C9.39774 11.0193 9.69962 11.325 9.9899 11.6026C10.427 12.0237 10.9866 11.9166 11.3166 11.5905C11.6422 11.2688 11.7576 10.7131 11.3486 10.2683C11.0545 9.95428 10.725 9.62097 10.3834 9.27166C9.20403 8.08024 7.8696 6.72603 7.20238 5.30836C6.50426 3.82226 6.66651 2.69983 7.09808 1.89415C7.81055 0.563666 9.37456 -0.137167 10.8398 0.225942C11.773 0.457161 12.7824 1.13206 13.3663 2.82234C13.8784 4.30347 13.8668 6.14605 13.8585 7.77838C13.8547 8.22703 13.8508 8.65581 13.8585 9.05313C13.8745 9.6607 14.3469 9.98242 14.8078 9.98629C15.2763 9.97856 15.741 9.6767 15.7609 9.07299C15.7769 8.64035 15.7807 8.17571 15.7846 7.68292C15.7967 6.00699 15.8083 4.1048 16.3409 2.6314C16.9965 0.813096 18.1394 0.194487 19.1405 0.0388687C20.4512 -0.165311 21.7862 0.44778 22.4849 1.57573C22.9959 2.40128 23.2503 3.60374 22.4567 5.23276C21.7735 6.6427 20.459 7.94117 19.2995 9.08458C18.9816 9.39858 18.6758 9.69988 18.3977 9.99015C17.9805 10.4272 18.0837 10.9906 18.4098 11.3168C18.7316 11.6423 19.2873 11.7577 19.7321 11.3488C20.0456 11.0546 20.3795 10.7252 20.7288 10.3836C21.9203 9.20433 23.2746 7.86557 24.6924 7.20282C26.1769 6.5053 27.2994 6.66698 28.1057 7.09742C29.4374 7.80818 30.1377 9.37319 29.7752 10.8389C29.5439 11.7726 28.869 12.7824 27.1786 13.3663C25.7012 13.8784 23.8546 13.8668 22.2261 13.8585C21.7774 13.8547 21.3486 13.8508 20.9474 13.8585C20.3398 13.8745 20.018 14.3469 20.0141 14.8077C20.0103 15.2646 20.3237 15.7408 20.9275 15.7607C21.3602 15.7767 21.8293 15.7806 22.3177 15.7844C23.9937 15.7966 25.896 15.8082 27.3695 16.3407C29.1874 16.9963 29.8066 18.1391 29.9622 19.1402L29.9611 19.1396Z" fill="#8C66E0"/>
            </svg>

        </div>
        <div className="menu">
            <ul>
                <li>
                    <a href="#">Materials</a>
                </li>
                <li>
                    <a href="#">Elements</a>
                </li>
                <li>
                    <a href="#">Projects</a>
                </li>
                <li>
                    <a href="#">Manufacturers</a>
                </li>
                <li>
                    <a href="#" className='active'>Collections</a>
                </li>
            </ul>
        </div>
        <div className="profile">
            <img src='../../../public/images.png' alt="..." id="profileIcon"/>
        </div>
    </div>    
  )
}

export default NavBar