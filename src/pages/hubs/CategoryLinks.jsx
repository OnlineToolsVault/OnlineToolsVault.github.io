import { Link } from 'react-router-dom'
import { tools, categoryHubs } from '../../data/tools'
import './CategoryLinks.css'

/**
 * The "Browse by category" block on the home page.
 *
 * The home page already has a category filter, but it is six <button>s driving a useState: the
 * categories existed only for a visitor who runs JavaScript and clicks. Nothing in the shipped
 * HTML linked to a category, and until the hubs were built there was nothing to link to. These
 * are real <Link>s to real prerendered URLs, so they appear as <a href> in the markup a crawler
 * reads, they open in a new tab on middle-click, and they can be shared.
 *
 * The filter buttons are left exactly as they were: filtering 107 cards in place is the faster
 * interaction once you are already here, and these links are for the other two cases — arriving
 * from a search result, and leaving to somewhere that can be linked.
 */
const CategoryLinks = () => {
    const countFor = (category) => tools.filter((tool) => tool.category === category).length

    return (
        <nav className="category-links" aria-label="Browse tools by category">
            {categoryHubs.map((hub) => (
                <Link to={hub.href} key={hub.category} className="category-link">
                    <span className="category-link-icon">
                        <hub.icon size={20} aria-hidden="true" />
                    </span>
                    <span className="category-link-text">
                        <span className="category-link-name">
                            {hub.name}
                            <span className="category-link-count">{countFor(hub.category)}</span>
                        </span>
                        <span className="category-link-blurb">{hub.blurb}</span>
                    </span>
                </Link>
            ))}
        </nav>
    )
}

export default CategoryLinks
