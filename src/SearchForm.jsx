import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";
import { useFields } from "./hooks/useFields";

export const SearchForm = ({ search }) => {
	const [formData, handleChange] = useFields({ search: "" });

	const handleSubmit = (evt) => {
		evt.preventDefault();
		search(formData.search);
	};
	return (
		<Form className="SearchForm mb-3" onSubmit={handleSubmit}>
			<Row className="row g-3 align-items-center">
				<Col md={11}>
					<Input
						name="search"
						value={formData.search}
						onChange={handleChange}
						placeholder="Enter search term..."
					/>
				</Col>
				<Col md={1}>
					<Button color="primary">Submit</Button>
				</Col>
			</Row>
		</Form>
	);
};
