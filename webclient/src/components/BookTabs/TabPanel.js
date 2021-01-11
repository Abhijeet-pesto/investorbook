import React from 'react';

export const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`app-tabpanel-${index}`}
			aria-labelledby={`app-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	);
};
