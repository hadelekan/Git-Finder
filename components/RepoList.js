import { render } from '../js/component.js'
import RepoItem from './RepoItem.js'

function RepoList(data) {
    let template = ''
    data.forEach(i => { template += RepoItem(i)})
    return render(template)
}

export default RepoList;