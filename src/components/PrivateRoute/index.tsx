import {Redirect} from 'umi';

export default function PrivateRoute({children, location}) {
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin) {
        return children;
    } else {
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: {from: location},
                }}
            />
        );
    }
}
