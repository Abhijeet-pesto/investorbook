import React, { useState } from 'react';
import './InvestorView.css';
import { useQuery } from '@apollo/client';
import { GET_INVESTORS } from '../../queries/queries';
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableFooter,
	TableCell,
	TableRow,
	TablePagination,
} from '@material-ui/core';
import {
	useStyles,
	StyledTableHeadCell,
	StyledTooltip,
} from '../../assets/customStyles';

export const InvestorView = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(6);

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

	const addInvestor = () => {
		alert('New Investor');
	};

	if (!loading && error) {
		return (
			<div className='table-loading-error'>
				<span>Error! Please refresh and try again.</span>
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
			<TableContainer>
				<Table aria-label='investors table'>
					<TableHead>
						<TableRow>
							<StyledTableHeadCell>NAME</StyledTableHeadCell>
							<StyledTableHeadCell>INVESTMENTS</StyledTableHeadCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{loading
							? Array.from({ length: rowsPerPage }, (_, index) => (
									<TableRow key={index}>
										<TableCell className={classes.investorName}>
											<div className='investor-details-loading'>
												<span className='investor-icon-loading loading-animation'></span>
												<span className='investor-name-loading loading-animation'></span>
											</div>
										</TableCell>
										<TableCell className={classes.investments}>
											<div className='table-row-loading loading-animation'></div>
										</TableCell>
									</TableRow>
							  ))
							: data.currentInvestors.map((investor) => (
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
												investor.investments.map(
													({ company, amount }, index) => (
														<StyledTooltip
															key={company.id}
															arrow
															title={`Invested: ${formatAmount(amount)}`}
														>
															<span className='investor-company'>
																{company.name}
																{index !== investor.investments.length - 1 &&
																	', '}
															</span>
														</StyledTooltip>
													),
												)
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
							{loading ? (
								<>
									<TableCell className={classes.tableFooterCell} />
									<TableCell className={classes.tableFooterCell}>
										<div className='table-footer-loading loading-animation'></div>
									</TableCell>
								</>
							) : (
								<TablePagination
									className={classes.tableFooterCell}
									rowsPerPageOptions={[6, 12]}
									rowsPerPage={rowsPerPage}
									page={page}
									count={data.totalInvestors.aggregate.count}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
								/>
							)}
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</div>
	);
};
