import { withStyles, makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';

export const useStyles = makeStyles({
	investorName: {
		width: '25%',
		padding: '1rem 1rem 1rem 0',
	},
	companyName: {
		width: '15%',
		padding: '1rem 0.5rem',
	},
	investments: {
		padding: '1rem 0.5rem',
		height: '10rem',
	},
	tableFooterCell: {
		borderBottom: 'none',
		padding: '1rem !important',
		height: '8rem',
	},
});

export const StyledTableHeadCell = withStyles({
	root: {
		fontSize: '1.5rem',
		color: '#a5a5a5',
		padding: '1rem 0.5rem',
	},
})(TableCell);

export const StyledTooltip = withStyles({
	tooltip: {
		fontSize: '1.5rem',
	},
})(Tooltip);
