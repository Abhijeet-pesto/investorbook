import { gql } from '@apollo/client';

export const GET_INVESTORS = gql`
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

export const GET_COMPANIES = gql`
	query GetCompanies($limitBy: Int, $offsetBy: Int, $investorsLimit: Int) {
		companies: company(limit: $limitBy, offset: $offsetBy) {
			id
			name
			investors(limit: $investorsLimit) {
				investor {
					id
					name
				}
				amount
			}
		}
		totalCompanies: company_aggregate {
			aggregate {
				count
			}
		}
	}
`;
