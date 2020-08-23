import React from 'react';
import { Loader } from '../'
import './SearchResults.scss';

const SearchResults = ({ items, isFetching, itemNotFound }) => {
	return (
		<div className={'SearchResults__container'}>
			<Loader isFetching={isFetching} />
			{items.length > 0 ? (
				<>
					<h2>Resultados de la busqueda</h2>
					<div className={'SearchResults__results'}>
						<ul>
							{items.map(item => (
								<li>
									<div className={'SearchResults____result'}>
										<img width='150' height='150' src={item.sprites.front_default} alt={item.name} />
										<section>
											<h1>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h1>
											<ul>
												<li>
													<strong>#: </strong>{item.id} <br />
												</li>
												<li>
													<strong>Type: </strong>{item.types.map(({ type }) => type.name).join(', ')} <br />
												</li>
												<li>
													<strong>Weight: </strong>{item.weight} <br />
												</li>
												<li>
													<strong>Abilities: </strong>{item.abilities.map(({ ability }) => ability.name).join(', ')} <br />
												</li>
											</ul>
										</section>
									</div>
								</li>
							)
							)
							}
						</ul>
					</div>
				</>
			) : itemNotFound && (
				<h2>Item not found</h2>
			)
			}
		</div>
	)
}

export default SearchResults;