export async function POST(request: Request) {
	const res = await request.json();
	console.log(res);
	const response = await fetch(
		`https://geo.ipify.org/api/v2/country,city?apiKey=at_68QkQStlTaCIVQsqUKrEBt6art0V7&domain=${res}`,
		{
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);
	// console.log(response);
	const result = await response.json();
	return Response.json(result);
}
