import { Route, Redirect, Switch } from 'react-router-dom';
/**
 * Guest Routes
 */
import LoginPage from './view/pages/LoginPage';
import MobileCertificatePage from './view/pages/MobileCertificatePage';

/**
 * Company Routes
 */
import CompanyMainPage from './view/pages/CompanyMainPage';
import CompanyControlPage from './view/pages/CompanyControlPage';
import CompanyProductPage from './view/pages/CompanyProductPage';
import CompanyDevicePage from './view/pages/CompanyDevicePage';
import CompanyAccountPage from './view/pages/CompanyAccountPage';

/**
 * Company Sub Routes
 */
import CompanyDeviceDetailPage from './view/pages/CompanyDevicePage/Detail';
import CompanyControlDetailPage from './view/pages/CompanyControlPage/Detail';

export function RoutesForGuest() {
    return (
        <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/cert/:uuid" component={MobileCertificatePage} />
            <Redirect to="/login" />
        </Switch>
    );
}

// 디테일페이지는 해당 route 위에 위치해야한다.
export function RoutesForCompany() {
    return (
        <Switch>
            <Route path="/main" component={CompanyMainPage} />
            <Route path="/control/detail/:serial" component={CompanyControlDetailPage} />
            <Route path="/control" component={CompanyControlPage} />
            <Route path="/product" component={CompanyProductPage} />
            <Route path="/device/detail/:serial" component={CompanyDeviceDetailPage} />
            <Route path="/device" component={CompanyDevicePage} />
            {/* <Route path="/notice" component={CompanyNoticePage} /> */}
            <Route path="/account" component={CompanyAccountPage} />
            <Redirect to="/main" />
        </Switch>
    );
}
