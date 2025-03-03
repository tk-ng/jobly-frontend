import { useFields } from "./hooks/useFields";
import { useNavigate } from "react-router";
import { JoblyApi } from "./api";
import { UserContext } from "./UserContext";
import { useContext } from "react";
import {
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Row,
	Col,
	Card,
	CardBody,
	Alert,
} from "reactstrap";
import "./SignupForm.css";

export const ProfileForm = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const naviagte = useNavigate();
	const [formData, handleChange, resetForm, formErrors, setFormErrors] =
		useFields({
			firstName: `${currentUser.firstName}`,
			lastName: `${currentUser.lastName}`,
			email: `${currentUser.email}`,
		});

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		try {
			const updatedUser = await JoblyApi.saveChanges({
				username: currentUser.username,
				data: formData,
			});
			setCurrentUser((currentUser) => ({ ...currentUser, data: updatedUser }));
			resetForm();
			naviagte("/");
		} catch (err) {
			setFormErrors(err);
		}
	};

	return (
		<div className="ProfileForm">
			<Row>
				<Col
					className="container"
					md={{
						offset: 3,
						size: 6,
					}}
					sm="12"
					lg={{
						offset: 4,
						size: 4,
					}}
				>
					<h3 className="mb-3">Profile</h3>
					<Card>
						<CardBody>
							<Form onSubmit={handleSubmit}>
								<FormGroup>
									<Label for="username">Username</Label>
									<Input
										id="username"
										name="username"
										value={currentUser.username}
										disabled
									/>
								</FormGroup>
								<FormGroup>
									<Label for="firstName">First Name</Label>
									<Input
										id="firstName"
										name="firstName"
										value={formData.firstName}
										onChange={handleChange}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="lastName">Last Name</Label>
									<Input
										id="lastName"
										name="lastName"
										value={formData.lastName}
										onChange={handleChange}
									/>
								</FormGroup>
								<FormGroup>
									<Label for="email">Email</Label>
									<Input
										id="email"
										name="email"
										type="email"
										value={formData.email}
										onChange={handleChange}
									/>
								</FormGroup>
								{formErrors.length !== 0 && (
									<Alert color="danger">
										<p className="small mb-0">{formErrors}</p>
									</Alert>
								)}
								<div className="d-grid">
									<Button color="primary">Save Changes</Button>
								</div>
							</Form>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	);
};
