import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { TabPanel } from './TabPanel';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const AntTabs = withStyles({
	root: {
		borderBottom: '1px solid #e8e8e8',
	},
	indicator: {
		backgroundColor: '#1890ff',
	},
})(Tabs);

const AntTab = withStyles((theme) => ({
	root: {
		textTransform: 'none',
		minWidth: 72,
		fontWeight: theme.typography.fontWeightRegular,
		marginRight: theme.spacing(4),
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:hover': {
			color: '#40a9ff',
			opacity: 1,
		},
		'&$selected': {
			color: '#1890ff',
			fontWeight: theme.typography.fontWeightMedium,
		},
		'&:focus': {
			color: '#40a9ff',
		},
	},
	selected: {},
}))((props) => <Tab disableRipple {...props} />);

export const BookTabs = ({ tabLabels, tabPanels }) => {
	const [tab, setTab] = useState(0);

	const handleChange = (event, newValue) => {
		setTab(newValue);
	};

	return (
		<div className='tabs-container'>
			<AntTabs
				value={tab}
				onChange={handleChange}
				aria-label='investor book tabs'
			>
				{tabLabels.map((label) => (
					<AntTab label={label} key={label} />
				))}
			</AntTabs>
			{tabPanels.map((PanelComponent, index) => (
				<TabPanel
					value={tab}
					index={index}
					key={`${tabLabels[index]}_${index}`}
				>
					<PanelComponent />
				</TabPanel>
			))}
		</div>
	);
};
