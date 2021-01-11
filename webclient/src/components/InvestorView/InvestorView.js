import React, { useState } from 'react';
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
} from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

const GET_INVESTORS = gql`
	query GetInvestors {
		currentInvestors: investor(limit: 50) {
			id
			name
			photo_thumbnail
			investments {
				company {
					id
					name
				}
			}
		}
		totalInvestors: investor_aggregate {
			aggregate {
				count
			}
		}
	}
`;

export const InvestorView = () => {
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const { loading, error, data } = useQuery(GET_INVESTORS);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;
	if (data.currentInvestors.length === 0) return <p>The database is empty!</p>;

	return (
		<div className='investor-view-container'>
			<div className='investor-view-header'>
				<span className='title'>Investors</span>
				<button type='button'>Add Investor</button>
			</div>
			<TableContainer>
				<Table aria-label='investors table'>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Investments</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.currentInvestors
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((investor) => (
								<TableRow key={investor.id}>
									<TableCell>
										<img
											className='investor-icon'
											src={investor.photo_thumbnail}
											alt='No Pic'
										/>
										<span className='investor-name'>{investor.name}</span>
									</TableCell>
									<TableCell>
										{investor.investments.map(({ company }, index) => (
											<span className='investor-company' key={company.id}>
												{company.name}
												{index === investor.investments.length - 1 && ','}
											</span>
										))}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
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
		</div>
	);
};
