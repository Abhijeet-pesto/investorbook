import React, { useState, useEffect } from 'react';
import './InvestorView.css';
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableFooter,
	TableCell,
	TableRow,
	TablePagination,
	CircularProgress,
	Tooltip,
} from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const GET_INVESTORS = gql`
	query GetInvestors($limitBy: Int, $offsetBy: Int, $investmentsLimit: Int) {
		currentInvestors: investor(limit: $limitBy, offset: $offsetBy) {
			id
			name
			photo_thumbnail
			investments(limit: $investmentsLimit) {
				company {
					id
					name
				}
				amount
			}
		}
		totalInvestors: investor_aggregate {
			aggregate {
				count
			}
		}
	}
`;

const useStyles = makeStyles({
	investorName: {
		width: '25%',
		padding: '1rem 1rem 1rem 0',
	},
	investments: {
		padding: '1rem 0.5rem',
		height: '10rem',
	},
	tableFooter: {
		fontWeight: 'bold',
	},
});

const StyledTableHeadCell = withStyles({
	root: {
		fontSize: '1.5rem',
		color: '#a5a5a5',
		padding: '1rem 0.5rem',
	},
})(TableCell);

const StyledTooltip = withStyles({
	tooltip: {
		fontSize: '1.5rem',
	},
})(Tooltip);

export const InvestorView = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const classes = useStyles();

	const { loading, error, data } = useQuery(GET_INVESTORS, {
		variables: {
			limitBy: rowsPerPage,
			offsetBy: rowsPerPage * page,
			investmentsLimit: 50,
		},
	});

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const formatAmount = (value) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(value);

	if (loading) {
		return (
			<div className='investor-view-loader'>
				<span>Fetching Investors</span>
				<CircularProgress />
			</div>
		);
	}

	const addInvestor = () => {
		alert('New Investor');
	};

	if (error) {
		return (
			<div className='investor-view-loader'>
				<span>Error</span>
			</div>
		);
	}

	return (
		<div className='investor-view-container'>
			<div className='investor-view-header'>
				<div className='title'>Investors</div>
				<div className='add-btn-container'>
					<button
						type='button'
						className='add-investor-btn'
						onClick={addInvestor}
					>
						Add Investor
					</button>
				</div>
			</div>
			{data.currentInvestors.length === 0 ? (
				<div className='investor-view-loader'>
					<span>No Investors found</span>
				</div>
			) : (
				<TableContainer>
					<Table aria-label='investors table'>
						<TableHead>
							<TableRow>
								<StyledTableHeadCell>NAME</StyledTableHeadCell>
								<StyledTableHeadCell>INVESTMENTS</StyledTableHeadCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.currentInvestors.map((investor) => (
								<TableRow key={investor.id}>
									<TableCell className={classes.investorName}>
										<div className='investor-details'>
											<img
												className='investor-icon'
												src={investor.photo_thumbnail}
												alt='No Pic'
											/>
											<span className='investor-name'>{investor.name}</span>
										</div>
									</TableCell>
									<TableCell className={classes.investments}>
										{investor.investments.length > 0 ? (
											investor.investments.map(({ company, amount }, index) => (
												<StyledTooltip
													key={company.id}
													arrow
													title={`Invested: ${formatAmount(amount)}`}
												>
													<span className='investor-company'>
														{company.name}
														{index !== investor.investments.length - 1 && ', '}
													</span>
												</StyledTooltip>
											))
										) : (
											<span className='investor-company'>
												No Investments yet!
											</span>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									className={classes.tableFooter}
									rowsPerPageOptions={[5, 10]}
									rowsPerPage={rowsPerPage}
									page={page}
									count={data.totalInvestors.aggregate.count}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			)}
		</div>
	);
};
