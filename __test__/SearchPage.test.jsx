/**
 * @jest-environment jsdom
 */
import React from 'react';
import SearchPage from '../views/SearchPage';
import {act, render} from '@testing-library/react';
import faker from 'faker';

describe("SearchPage Component", () => {
	const results = new Array(10).fill(0).map((res) => {
		return {
			_id: faker.random.alphaNumeric(16),
			authors: [faker.name.firstName(), faker.name.lastName()],
			tags:  [faker.lorem.word(), faker.lorem.word()],
			name: faker.name.firstName(),
			createdBy: faker.lorem.words(),
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent(),
			lastVisited: faker.date.soon()
		};
	});

	it("should check if the first projects render on the SearchPage ", () => {
		act(() => {
			render(
			<SearchPage result={results}/>
			)
		})

		const item = document.getElementsByClassName("project-card");
		expect(item.length).toBe(8);
	})
});