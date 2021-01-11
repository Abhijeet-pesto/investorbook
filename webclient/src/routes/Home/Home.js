import React from 'react';
import './Home.css';
import Paper from '@material-ui/core/Paper';
import { BookTabs, InvestorView, CompaniesView } from '../../components';

const tabLabels = ['Investors', 'Companies'];
const tabPanels = [InvestorView, CompaniesView];

export const Home = () => {
	return (
		<div className='home-container'>
			<Paper elevation={5}>
				<div className='home-header'>
					<span className='title'>INVESTOR</span>
					<span className='title'>BOOK</span>
				</div>
				<div className='home-content'>
					<BookTabs tabLabels={tabLabels} tabPanels={tabPanels} />
				</div>
			</Paper>
		</div>
	);
};
