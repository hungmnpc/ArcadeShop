import { icon } from "@fortawesome/fontawesome-svg-core";
import { faAngleDown, faAngleLeft, faBagShopping, faBarsProgress, faBorderAll, faBuildingCircleArrowRight, faChartLine, faChartPie, faCheck, faCodeBranch, faDroplet, faIndustry, faListCheck, faMobile, faPaperPlane, faPencil, faPuzzlePiece, faReceipt, faToolbox, faTruckFast, faUser, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { images } from "../../../../assets/images";
import routes from "../../../../configs/routes";
import { AuthContext } from "../../../../context/userContext";
import style from './Sidebar.module.scss';
import { sidebar } from "./sidebarConfig";

const cx = classNames.bind(style)

const initState = {
    subIsOpen: '',
    linkActive: '',
}
const sidebarReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_SUB_OPEN':
            if (state.subIsOpen === action.itemText) {
                return {
                    ...state,
                    subIsOpen: ''
                }
            }
            return {
                ...state,
                subIsOpen: action.itemText
            }
        case 'CHANGE_LINK_ACTIVE':
            return {
                ...state,
                linkActive: action.link
            }
        default:
            return state
    }
}

const SidebarContext = createContext();
function Sidebar() {
    
    const [sidebarState, dispatch] = useReducer(sidebarReducer, initState)

    const [minimumSidebar, setMinimumSidebar] = useState(false);

    const location = useLocation();


    useEffect(() => {
        dispatch({type: 'CHANGE_LINK_ACTIVE',
                    link: location.pathname})
    },[location])
    // console.log(location.pathname)

    // console.log(minimumSidebar);

    return ( 
        <SidebarContext.Provider value={[sidebarState, dispatch]}>
            <div className={cx('wrapper')}>
                {/* <div className={cx('header-brand')}>
                    <Link className={cx('logo')} to={routes.root}>
                        <img src={images.logo.default} alt='logo' />
                    </Link>
                </div> */}
                <div className={cx('sidebar-content')}>
                    {
                        sidebar.map((group, index) => (
                            <GroupSidebar group={group} key={index} />
                        ))
                    }
                </div>
                <div className={cx('toggle-minimum-sidebar')} onClick={() => setMinimumSidebar(!minimumSidebar)}>
                    <FontAwesomeIcon icon={faAngleLeft} className={cx('icon-toggle')} />
                </div>
            </div>
        </SidebarContext.Provider>
     );
}


function GroupSidebar({group}) {
    

    return (
        <div className={cx('groupsidebar')}>
            <div className={cx('group-header')}>
            </div>
            <div className={cx('group-items')}>
                {
                    group.items.map((item, index) =>(
                        <GroupItem  key={index} item={item}/>
                    ))
                }
            </div>
            
        </div>
    )
}

function GroupItem({item}) {

    const hasSubs = item.subs !== undefined

    const [sidebarState, dispatch] = useContext(SidebarContext);


    const _prop = {

    }
    let Comp = 'div';
    if (item.to) {
        _prop.to = item.to;
        Comp = Link;

    }

    const subRef = useRef(null);


    return (
        <div className={cx('group-item',[hasSubs && sidebarState.subIsOpen ===  item.text? 'sub-open' : ''])}>
            <Comp {..._prop} className={cx('group-item-main',[!hasSubs && sidebarState.linkActive === item.to ? 'active' : ''])} onClick={() => dispatch({type: 'CHANGE_SUB_OPEN', itemText: item.text})}>
                <span>{item.text}</span>
                {
                    hasSubs && (
                        <FontAwesomeIcon icon={faAngleDown} className={cx('icon-dropdown')} />
                    )
                }
            </Comp>
            {
                hasSubs && (
                    <div className={cx('sub-items')} ref={subRef} style={sidebarState.subIsOpen ===  item.text && subRef.current ? {height: subRef.current.scrollHeight + 'px'} : {}}>
                        {
                            item.subs.map((sub, index) => (
                                <Link to={sub.to} key={index} className={cx('sub-item', [sidebarState.linkActive === sub.to ? 'active' : ''])} >
                                    {sub.text}
                                </Link>
                            ))
                        }
                    </div>
                )
            }

        </div>
    )
}

export default Sidebar;