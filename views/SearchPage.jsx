import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from "react-router-dom";
import Layout from './shared/Layout';//import Layout component from the shared folder
import './App.css'
import $ from 'jquery';
import { Row, Col, Jumbotron, Container, Button, Card } from 'react-bootstrap';

const Search = (props) => {

	const { result, searchTerm, current_user, searchBy, count } = props;	//destructuring the props gotten when the page was rendered.
	const [searchInput, setSearchInput] = useState(searchTerm || '');	//whatever the user searches for is stored here
	const [pageSize] = useState(8);//the limit of documents per page
	const [searchResult, setSearchResult] = useState(result);
	const [pageIndex, setPageIndex] = useState(1);//the current page index
	const [numberOfPages] = useState(Math.ceil(count / pageSize));//number of pages
	const isInitialMount = useRef(true);

	//useEffect that uses an ajax call to get next projects to be displayed when the pageIndex changes.
	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
		} else {
			// Your useEffect code here to be run on update
		$.ajax({
			url: '/projects/next',
			type: 'GET',
			data: {
				"searchTerm": searchInput,
				"search_by": searchBy,
				"pageIndex": pageIndex,
				"pageSize": pageSize
			},
			success: function () {
				console.log('form submitted.');
			},
			error: function () {
				console.log('something went wrong - debug it!');
			}
		}).done(function (data) {
			setSearchResult(data);
		});
	}
	}, [pageIndex])

	//function that updates the searchInput state everytime a user enters a value
	const handleSearchInput = event => {
		const { value } = event.target;
		setSearchInput(value);
	}

	//sets the current page to current page + 1 when the nextPage is clicked
	const nextPage = (e) => {
		e.preventDefault();
		setPageIndex(pageIndex => pageIndex + 1);
	}

	//sets the current page to current page - 1 when the previousPage is clicked
	const previousPage = (e) => {
		e.preventDefault();
		setPageIndex(pageIndex => pageIndex - 1)
	}

	return (
		<>
			<Layout user={current_user}>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<h3 className="search_h3" style={{ marginLeft: "5vw", marginTop: "2vw" }}>Project Gallery</h3>
				<form inline method="get" id="searchForm">
					<Jumbotron style={{ margin: '2vw 5vw 2vw 5vw', padding: '1%', backgroundSize: "cover", backgroundPosition: "center" }}>
						<Row>
							<Col class="col-12 col-md-4">
								<div className="form-group" class="col-4">
									<input type="text" name="searchTerm" value={searchInput} onChange={handleSearchInput} className="form-control form-control-lg" placeholder="Search project names, authors, abstract, tags" />
								</div>
							</Col>
							<Col class="col-12 col-md-4">
								<div className="input-group flex-nowrap">
									<div className="input-group-prepend">
										<span className="input-group-text" id="inputGroupPrepend2">Search By</span>
									</div>
									<select name="search_by" className="form-control form-control-lg" id="search_by">
										<option value="choose"></option>
										<option id="name" value="name" selected={searchBy == "name"}>Project Name</option>
										<option value="abstract" selected={searchBy == "abstract"}>Project Abstract</option>
										<option value="authors" selected={searchBy == "authors"}>Project Authors</option>
										<option value="tags" selected={searchBy == "tags"}>Project Tags</option>
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

					{searchResult.length > 0
						?
						<div>
							<div className="dataContainer" style={{ justifyContent: "center" }}>
								<h3 style={{ marginLeft: "5vw", marginTop: "2vw" }}>All Projects (<span>{count} results</span>) </h3>
								<Container>
									<Row>
										{/*Checks that the projects are not undefined and then
										maps through each project and displays then in a card
										*/}
										{searchResult && searchResult.slice(0, 4).map((item) => (
											<Col keys={item.id}>
												<Card className="project-card" keys={item.id}>
													<Card.Body keys={item.id} >
														<a keys={item.id} href={`/project/${item.id}`} keys={item.name}>{item.name}</a><br />
														<Card.Text>{item.authors}</Card.Text>
														<Card.Text>{item.abstract}</Card.Text>
														{current_user !== undefined ? <Card.Text>{<span keys={item.id}>{item.lastVisited === null ? "Not yet viewed. To view a project, Click on the Project name" : `Last viewed: ${item.lastVisited}`}</span>}</Card.Text> : ""}
														{item.tags.map((item) => (
															<a keys={item.id} href={`/projects/search?search_by=tags&searchTerm=${item.substring(1)}&pageSize=8&pageIndex=1`} keys={item}> {item}</a>
														))}
													</Card.Body>
												</Card>
												<br />
											</Col>
										))}
									</Row>

									<Row>
										{/*Checks that the projects are not undefined and then
										maps through each project and displays then in a card
										*/}
										{searchResult && searchResult.slice(4).map((item) => (
											<Col keys={item._id}>
												<Card className="project-card" keys={item._id}>
													<Card.Body keys={item._id} >
														<a keys={item._id} href={`/project/${item._id}`} keys={item.name}>{item.name}</a><br />
														<Card.Text>{item.authors}</Card.Text>
														<Card.Text>{item.abstract}</Card.Text>
														{current_user !== undefined ? <Card.Text>{<span keys={item._id}>{item.lastVisited === null ? "Not yet viewed. To view a project, Click on the Project name" : `Last viewed: ${item.lastVisited}`}</span>}</Card.Text> : ""}
														{item.tags.map((item) => (
															<a keys={item._id} href={`/projects/search?search_by=tags&searchTerm=${item.substring(1)}&pageSize=8&pageIndex=1`} keys={item}> {item}</a>
														))}
													</Card.Body>
												</Card>
												<br />
											</Col>
										))}
									</Row>

								</Container>
							</div>
							{count < 8 ?
								''
								:
								<div className="pagination" style={{ width: "100%" }}>

									{/* previous button */}
									<div style={{ margin: "0vw 0vw 0vw 10vw", float: "left" }}>
										<Button
											onClick={previousPage}
											variant="primary"
											disabled={pageIndex === 1 ? true : false}
										>
											Previous
									</Button>
									</div>

									{/* next button */}
									<div>

										<Button
											onClick={nextPage}
											variant="primary"
											disabled={pageIndex === numberOfPages ? true : false}
										>
											Next
									</Button>
									</div>
								</div>
							}
						</div>
						:
						//this is shown when the projectResults are undefined
						<h1 class="search_text m-3" style={{ textAlign: "center" }}>No search results exists yet</h1>
					}
				</form>
			</Layout>
		</>
	);//end of return statement
}//end of Search component

//export the search page
export default Search;