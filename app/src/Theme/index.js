import React, { Component } from 'react';
import classNames from 'classnames';
import  AppTopbar  from './AppTopbar';
import { AppBreadcrumb } from './AppBreadcrumb';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Dashboard } from '../Pages/Dashboard';
import { FormsDemo } from '../components/FormsDemo';
import { SampleDemo } from '../components/SampleDemo';
import { DataDemo } from '../components/DataDemo';
import { PanelsDemo } from '../components/PanelsDemo';
import { OverlaysDemo } from '../components/OverlaysDemo';
import { MenusDemo } from '../components/MenusDemo';
import { MessagesDemo } from '../components/MessagesDemo';
import { ChartsDemo } from '../components/ChartsDemo';
import { MiscDemo } from '../components/MiscDemo';
import { EmptyPage } from '../components/EmptyPage';
import { Documentation } from '../components/Documentation';
import 'primereact/resources/primereact.min.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './style.css';
import {createMenu} from '../service/MenuService'; 
import PersonalData from '../Pages/PersonalData';
import SportsData from '../Pages/SportsData';
import Schedule from '../Pages/Schedule';
import Frequency from '../Pages/Frequency';
import Organization from '../Pages/Organization';
import Teams from '../Pages/Teams';
import Championship from '../Pages/Championship';
import Games from '../Pages/Games';
import Competitions from '../Pages/Competitions';
class App extends Component {
    //static contextType = MenuContext
    constructor() {
        console.log("app.js");
        super();
        console.log(createMenu());
        this.state = {
            layoutMode: 'static',
            overlayMenuActive: false,
            staticMenuDesktopInactive: false,
            staticMenuMobileActive: false,
            topbarMenuActive: false,
            activeTopbarItem: null,
            darkTheme: false,
            menuActive: false,
            themeColor: 'blue',
            configDialogActive: false
        };
        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this);
        this.onThemeChange = this.onThemeChange.bind(this);
        this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
        this.changeMenuMode = this.changeMenuMode.bind(this);
        this.changeMenuColor = this.changeMenuColor.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
        this.onConfigButtonClick = this.onConfigButtonClick.bind(this);
        this.onConfigCloseClick = this.onConfigCloseClick.bind(this);
        this.onConfigClick = this.onConfigClick.bind(this);
        //this.createMenu();
        this.menu = createMenu();
    }

    onMenuClick(event) {
        this.menuClick = true;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.setState(({
            topbarMenuActive: false
        }));

        if (this.state.layoutMode === 'overlay' && !this.isMobile()) {
            this.setState({
                overlayMenuActive: !this.state.overlayMenuActive
            });
        } else {
            if (this.isDesktop())
                this.setState({ staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive });
            else
                this.setState({ staticMenuMobileActive: !this.state.staticMenuMobileActive });
        }

        event.preventDefault();
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.setState({ topbarMenuActive: !this.state.topbarMenuActive });
        this.hideOverlayMenu();
        event.preventDefault();
    }

    onTopbarItemClick(event) {
        this.topbarItemClick = true;

        if (this.state.activeTopbarItem === event.item)
            this.setState({ activeTopbarItem: null });
        else
            this.setState({ activeTopbarItem: event.item });

        event.originalEvent.preventDefault();
    }

    onMenuItemClick(event) {
        if (!event.item.items) {
            this.hideOverlayMenu();
        }
        if (!event.item.items && (this.isHorizontal() || this.isSlim())) {
            this.setState({
                menuActive: false
            })
        }
    }

    onRootMenuItemClick(event) {
        this.setState({
            menuActive: !this.state.menuActive
        });
    }

    onConfigButtonClick(event) {
        this.configClick = true;
        this.setState({ configDialogActive: !this.state.configDialogActive })
    }

    onConfigCloseClick() {
        this.setState({ configDialogActive: false })
    }

    onConfigClick() {
        this.configClick = true;
    }

    onDocumentClick(event) {
        if (!this.topbarItemClick) {
            this.setState({
                activeTopbarItem: null,
                topbarMenuActive: false
            });
        }

        if (!this.configClick) {
            this.setState({ configDialogActive: false });
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.setState({
                    menuActive: false
                })
            }

            this.hideOverlayMenu();
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.configClick = false;
    }

    hideOverlayMenu() {
        this.setState({
            overlayMenuActive: false,
            staticMenuMobileActive: false
        })
    }

    isTablet() {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.state.layoutMode === 'overlay';
    }

    isHorizontal() {
        return this.state.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.state.layoutMode === 'slim';
    }

    changeMenuMode(event) {
        this.setState({
            layoutMode: event.menuMode,
            staticMenuDesktopInactive: false,
            overlayMenuActive: false
        });
    }

    changeMenuColor(event) {
        this.setState({ darkTheme: event.darkTheme })
        this.onThemeChange();
    }

    onThemeChange() {
        const themeLink = document.getElementById('theme-css');
        const href = themeLink.href;
        const themeFile = href.substring(href.lastIndexOf('/') + 1, href.lastIndexOf('.'));
        const themeTokens = themeFile.split('-');
        const themeName = themeTokens[1];
        const themeMode = themeTokens[2];
        const newThemeMode = (themeMode === 'dark') ? 'light' : 'dark';

        this.changeTheme({ originalEvent: null, theme: themeName + '-' + newThemeMode });
    }

    changeTheme(event) {
        this.setState({ themeColor: event.theme.split('-')[0] })
        this.changeStyleSheetUrl('layout-css', event.theme, 'layout');
        this.changeStyleSheetUrl('theme-css', event.theme, 'theme');
    }

    changeStyleSheetUrl(id, value, prefix) {
        let element = document.getElementById(id);
        let urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
        let newURL = urlTokens.join('/');

        this.replaceLink(element, newURL);

        if (value.indexOf('dark') !== -1) {
            this.setState({ darkTheme: true });
        } else {
            this.setState({ darkTheme: false });
        }
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent)
    }

    replaceLink(linkElement, href) {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);

        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        }
        else {
            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    render() {
        //const menu = useContext(MenuContext);
        //console.log(menu);
        const layoutClassName = classNames('layout-wrapper', {
            'layout-horizontal': this.state.layoutMode === 'horizontal',
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-slim': this.state.layoutMode === 'slim',
            'layout-static-inactive': this.state.staticMenuDesktopInactive,
            'layout-mobile-active': this.state.staticMenuMobileActive,
            'layout-overlay-active': this.state.overlayMenuActive
        });
        const AppBreadCrumbWithRouter = withRouter(AppBreadcrumb);

        return (
            <div className={layoutClassName} onClick={this.onDocumentClick}>

                <AppTopbar darkTheme={this.state.darkTheme} onThemeChange={this.onThemeChange}
                    topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem}
                    onMenuButtonClick={this.onMenuButtonClick}
                    onTopbarMenuButtonClick={this.onTopbarMenuButtonClick}
                    onTopbarItemClick={this.onTopbarItemClick} />

                <div className='layout-menu-container' onClick={this.onMenuClick}>
                    <div className="layout-menu-content">
                        <div className="layout-menu-title">MENU</div>
                        <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick}
                            onRootMenuItemClick={this.onRootMenuItemClick}
                            layoutMode={this.state.layoutMode} active={this.state.menuActive} />
                    </div>
                </div>

                <div className="layout-content">
                    <AppBreadCrumbWithRouter />

                    <div className="layout-content-container">
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/personal-data" exact component={PersonalData} />
                        <Route path="/sports-data" exact component={SportsData} />
                        <Route path="/schedule" exact component={Schedule} />
                        <Route path="/frequency" exact component={Frequency} />
                        <Route path="/organization" exact component={Organization} />
                        <Route path="/teams" exact component={Teams} />
                        <Route path="/championship" exact component={Championship} />
                        <Route path="/games" exact component={Games} />
                        <Route path="/competitions" exact component={Competitions} />
                    </div>

                    <AppFooter />

                    {this.state.staticMenuMobileActive && <div className="layout-mask"></div>}
                </div>


                <AppConfig layoutMode={this.state.layoutMode} darkTheme={this.state.darkTheme} themeColor={this.state.themeColor}
                    changeMenuMode={this.changeMenuMode} changeMenuColor={this.changeMenuColor} changeTheme={this.changeTheme}
                    onConfigButtonClick={this.onConfigButtonClick} onConfigCloseClick={this.onConfigCloseClick}
                    onConfigClick={this.onConfigClick} configDialogActive={this.state.configDialogActive} />
            </div>
        );
    }
}

export default App;
