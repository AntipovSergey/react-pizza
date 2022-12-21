import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const Layout = ({ searchValue, setSearchValue }) => {
	return (
		<>
			<Header searchValue={searchValue} setSearchValue={setSearchValue} />
			<Outlet />
		</>
	);
};

export default Layout;
