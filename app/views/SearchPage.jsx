import React, { useState } from 'react';
import Layout from './shared/Layout';//import Layout component from the shared folder
import { Row, Col, Jumbotron, Container, Button, Card } from 'react-bootstrap';
function Pagination({ data, dataLimit }) {
		const [pages] = useState(Math.ceil(data.length / dataLimit));
		const [currentPage, setCurrentPage] = useState(1);

		function nextPage() {
			setCurrentPage((page) => page + 1);
		}

		function previousPage() {
			setCurrentPage((page) => page - 1);
		}

		const getPaginatedData = () => {
			const startIndex = currentPage * dataLimit - dataLimit;
			const endIndex = startIndex + dataLimit;
			return data.slice(startIndex, endIndex);
		};

		return (
			<div>
				<div class="heading" style={{ margin: "30px 80px 10px 70px" }}>
					<h4 class="search_h4">All Projects <span class="search_h5 text-muted">{`(${data.length} results)`}</span></h4>
				</div>

				{/* show the posts, 8 posts at a time */}
				<div className="dataContainer">
					<Container>
						<Row>
							{getPaginatedData().map((item) => (
								<Col keys={item._id}>
									<Card className="project-card" keys={item._id} style={{ height: "18rem" ,width: "15rem;" }}>
										<Card.Body keys={item._id} >
											<a href={`/project/${item._id}`} keys={item.name}>{item.name}</a>
											<br /> {item.authors} <br /><br /> {item.abstract}  <br /><br />
											{<span>{item.lastVisited === '' ? "Not yet visited" : `Last visited: ${item.lastVisited}`}</span>} <br />
											{item.tags.map((item) => (
												<a href={`/projects/search?search_by=tags&searchTerm=${item.substring(1)}`} keys={item}> {item}</a>
											))}
										</Card.Body>
									</Card>
									<br />
								</Col>
							))}
						</Row>
					</Container>
				</div>

				{/* show the pagiantion style={{ width: '600px' }
				it consists of next and previous buttons
				along with page numbers, in our case, 8 page
				numbers at a time
				*/}

				<div className="pagination" style={{ width: "100%" }}>
					{/* previous button */}
					<div style={{margin: "10px 0px 0px 120px", float: "left"}}>
						<Button
							onClick={previousPage}
							variant="primary"
							disabled={currentPage === 1 ? true : false}
						>
							Previous
						</Button>
					</div>

					{/* next button */}
					<div style={{margin: "10px 0px 0px 950px",float: "right"}}>
						<Button
							onClick={nextPage}
							variant="primary"
							disabled={currentPage === pages ? true : false}
						>
							Next
						</Button>
					</div>
				</div>
			</div>
		);
	}
const Search = (props) => {

	const { result, searchTerm } = props;
	const [searchInput, setSearchInput] = useState(searchTerm || '');

	const handleSearchInput = event => {
		const { value } = event.target;
		setSearchInput(value);
	}
	return (
		<>
			<Layout>
				<h3 class="search_h3" style={{ margin: "40px 80px 0px 70px" }}>Project Gallery</h3>
				<form method="get" id="searchForm">
					<div class="jumbotron container search" style={{ height: "80px", width: "2000px", margin: "20px 80px 10px 70px", padding: "10px" }}>
						<div class="row">
							<div class="col">
								<div class="form-group" style={{ width: '600px' }}>
									<input type="text" name="searchTerm" value={searchInput} onChange={handleSearchInput} class="form-control form-control-lg" placeholder="Search project names, authors, abstract, tags" />
								</div>
							</div>
							<div class="col">
								<div class="input-group">
									<div class="input-group-prepend">
										<span class="input-group-text" id="inputGroupPrepend2">Search By</span>
									</div>
									<select name="search_by" style={{ width: '120px' }} class="form-control form-control-lg" id="search_by">
										<option></option>
										<option value="name" >Project Name</option>
										<option value="abstract">Project Abstract</option>
										<option value="authors">Project Authors</option>
										<option value="tags">Project Tags</option>
									</select>
								</div>
							</div>

							<div class="col">
								<button class="btn btn-lg btn-primary">Submit</button>
							</div>
						</div>
					</div>
				</form>
				<div>
					{result
						?
						<Pagination
							data={result}
							dataLimit={8}
						/>
						:
						<h1 style={{ textAlign: "center" }}>No search results exists yet</h1>

					}
				</div>
			</Layout>
		</>
	);
}
export default Search;