import React, { useState } from 'react';
import './CompaniesView.css';
import { useQuery } from '@apollo/client';
import { GET_COMPANIES } from '../../queries/queries';
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

export const CompaniesView = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(6);

	const classes = useStyles();

	const { loading, error, data } = useQuery(GET_COMPANIES, {
		variables: {
			limitBy: rowsPerPage,
			offsetBy: rowsPerPage * page,
			investorsLimit: 50,
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

	const addCompany = () => {
		alert('New Investor');
	};

	return (
		<div className='companies-view-container'>
			<div className='companies-view-header'>
				<div className='title'>Companies</div>
				<div className='add-btn-container'>
					<button
						type='button'
						className='add-companies-btn'
						onClick={addCompany}
					>
						Add Company
					</button>
				</div>
			</div>
			<TableContainer>
				<Table aria-label='companies table'>
					<TableHead>
						<TableRow>
							<StyledTableHeadCell>NAME</StyledTableHeadCell>
							<StyledTableHeadCell>INVESTORS</StyledTableHeadCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{loading ? (
							Array.from({ length: rowsPerPage }, (_, index) => (
								<TableRow key={index}>
									<TableCell className={classes.companyName}>
										<div className='companies-details-loading loading-animation'></div>
									</TableCell>
									<TableCell className={classes.investments}>
										<div className='table-row-loading loading-animation'></div>
									</TableCell>
								</TableRow>
							))
						) : error ? (
							<div className='table-loading-error'>
								<span>Error</span>
							</div>
						) : (
							data.companies.map((company) => (
								<TableRow key={company.id}>
									<TableCell className={classes.companyName}>
										<div className='company-details'>
											<span className='company-name'>{company.name}</span>
										</div>
									</TableCell>
									<TableCell className={classes.investments}>
										{company.investors.length > 0 ? (
											company.investors.map(({ investor, amount }, index) => (
												<StyledTooltip
													key={investor.id}
													arrow
													title={`Invested: ${formatAmount(amount)}`}
												>
													<span className='company-investor'>
														{investor.name}
														{index !== company.investors.length - 1 && ', '}
													</span>
												</StyledTooltip>
											))
										) : (
											<span className='company-investor'>
												No Inverstors yet!
											</span>
										)}
									</TableCell>
								</TableRow>
							))
						)}
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
								!error && (
									<TablePagination
										className={classes.tableFooterCell}
										rowsPerPageOptions={[6, 12]}
										rowsPerPage={rowsPerPage}
										page={page}
										count={data.totalCompanies.aggregate.count}
										onChangePage={handleChangePage}
										onChangeRowsPerPage={handleChangeRowsPerPage}
									/>
								)
							)}
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</div>
	);
};
