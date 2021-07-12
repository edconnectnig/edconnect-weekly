import React, { useState } from 'react';
import Layout from './shared/Layout';//import Layout component from the shared folder
import './App.css'
import { Row, Col, Jumbotron, Container, Button, Card } from 'react-bootstrap';

//Pagination function that implements the next and previous buttons
function Pagination({ data, dataLimit,current_user }) {
		const [numberOfPages] = useState(Math.ceil(data.length / dataLimit));//number of pages
		const [currentPage, setCurrentPage] = useState(0);

		{/**function that is called when the next button is clicked 
		and it sets the currentPage to the next page index
		e.g If currentPage is 1, when this function is called,
		currentPage = 2 */}
	
		function nextPage() {
			setCurrentPage((page) => page + 1);
		}

		{/**function that is called when the previous button is clicked 
		and it sets the currentPage to the previous page index
		e.g If currentPage is 2, when this function is called,
		currentPage = 1 */}
		function previousPage() {
			setCurrentPage((page) => page - 1);
		}

		{/**function that gets the current 8 projects based on the
		currentPage of the projects.
		e.g if currentPage = 1, the first project for page 1 will have
		of index 0 and the last project will have an index of 8*/}
		const getProjectData = () => {
			const startIndex = currentPage * dataLimit;
			const endIndex = startIndex + dataLimit;
			return data.slice(startIndex, endIndex);
		};

		return (
			<div>
				<div className="heading" style={{ margin: "3vw 0vw 3vw 8vw" }}>
					<h4 className="search_h4">All Projects <span class="search_h5 text-muted">{`(${data.length} results)`}</span></h4>
				</div>

				{/* shows the projets, 8 projects at a time */}
				<div className="dataContainer" style={{justifyContent:"center"}}>
					<Container>
						<Row>
							{/*Checks that the projects are not undefined and then
							maps through each project and displays then in a card
							*/}
							{getProjectData() && getProjectData().map((item) => (
								<Col keys={item._id}>
									<Card className="project-card" keys={item._id}>
										<Card.Body keys={item._id} >
											<a keys={item._id} href={`/project/${item._id}`} keys={item.name}>{item.name}</a><br />
											<Card.Text>{item.authors}</Card.Text> 
											<Card.Text>{item.abstract}</Card.Text>
							{current_user !== undefined ? <Card.Text>{<span keys={item._id}>{item.lastVisited === null ? "Not yet viewed. To view a project, Click on the Project name" : `Last viewed: ${item.lastVisited}`}</span>}</Card.Text> : "" }
												{item.tags.map((item) => (
												<a keys={item._id} href={`/projects/search?search_by=tags&searchTerm=${item.substring(1)}`} keys={item}> {item}</a>
												))}
										</Card.Body>
									</Card>
									<br />
								</Col>
							))}
						</Row>
					</Container>
				</div>

				{/*
				it consists of next and previous buttons 
				*/}

				<div className="pagination" style={{ width: "100%" }}>

					{/* previous button */}
					<div style={{margin: "0vw 0vw 0vw 10vw", float: "left"}}>
						<Button
							onClick={previousPage}
							variant="primary"
							disabled={currentPage === 0 ? true : false}
						>
							Previous
						</Button>
					</div>

					{/* next button */}
					<div>
						<Button
							onClick={nextPage}
							variant="primary"
							disabled={currentPage === numberOfPages || data.length < 8 ? true : false}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
		);//end of return statement
	}//end of Pagination
const Search = (props) => {

	const { result, searchTerm, current_user } = props;	//destructuring the props gotten when the page was rendered.
	const [searchInput, setSearchInput] = useState(searchTerm || '');	//whatever the user searches for is stored here

	//function that updates the searchInput state everytime a user enters a value
	const handleSearchInput = event => {
		const { value } = event.target;
		setSearchInput(value);
	}

	//The html that is rendered on the page when it opens
	return (
		<>
			<Layout user={current_user}>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<h3 className="search_h3" style={{ marginLeft:"5vw", marginTop:"2vw" }}>Project Gallery</h3>
				<form inline method="get" id="searchForm">
					<Jumbotron style={{margin :'2vw 5vw 0vw 5vw', padding:'1%', backgroundSize: "cover" , backgroundPosition: "center"}}>
						<Row>
							<Col class="col-12 col-md-4">
								<div className="form-group" class="col-4">
									<input type="text"  name="searchTerm" value={searchInput} onChange={handleSearchInput} className="form-control form-control-lg" placeholder="Search project names, authors, abstract, tags" />
								</div>
							</Col>
							<Col class="col-12 col-md-4">
								<div className="input-group flex-nowrap">
									<div className="input-group-prepend">
										<span className="input-group-text" id="inputGroupPrepend2">Search By</span>
									</div>
									<select name="search_by" className="form-control form-control-lg" id="search_by">
										<option></option>
										<option value="name" >Project Name</option>
										<option value="abstract">Project Abstract</option>
										<option value="authors">Project Authors</option>
										<option value="tags">Project Tags</option>
									</select>
								</div>
							</Col>

							<Col class="col-12 col-md-4 mt-3 mt-md-0">
								<div>
									<button className="btn btn-lg btn-primary">Submit</button>
								</div>
							</Col>
						</Row>
					</Jumbotron>
				</form>
				<div>
					{result
						?
						//here, the pagination function is called and the data needed is passed to it.
						<Pagination
							data={result}
							dataLimit={8}
							current_user={current_user}
						/>
						:
						//this is shown when the projectResults are undefined
						<h1 class="search_text m-3" style={{ textAlign: "center" }}>No search results exists yet</h1>

					}
				</div>
			</Layout>
		</>
	);//end of return statement
}//end of Search component

//export the search page
export default Search;