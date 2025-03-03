import { UserContext } from "./UserContext";
import { Link } from "react-router";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import "./CompanyCard.css";
export const CompanyCard = ({ handle, name, description, logoUrl }) => {
	const dest_url = `/companies/${handle}`;
	const logo_dir = `/src/assets${logoUrl}`;
	return (
		<Link className="CompanyCard card" to={dest_url}>
			<CardBody>
				<CardTitle>
					{name} {logoUrl && <img src={logo_dir} className="float-end ms-5" />}
				</CardTitle>
				<p>
					<small>{description}</small>
				</p>
			</CardBody>
		</Link>
	);
};
