import Avatar from 'antd/lib/avatar';
import Input from 'antd/lib/input';
import List from 'antd/lib/list';
import { debounce } from 'helpers/debounce';
import React from 'react';
import './AutoCompleteSearch.scss';
import repository from './AutoCompleteSearchRepository';

function AutoCompleteSearch() {
  const [search, setSearch] = React.useState<string>('');
  const [list, setList] = React.useState<any[]>([]);

  const handleUpdateSearch = React.useCallback(debounce(setSearch), []);

  const handleSearch = React.useCallback(
    (event) => {
      handleUpdateSearch(event.target.value);
    },
    [handleUpdateSearch],
  );

  React.useEffect(
    () => {
      repository.search(search)
        .then((list) => {
          setList(list);
        });
    },
    [search],
  );

  return (
    <div className="auto-complete">
      <Input type="text" onChange={handleSearch} defaultValue={search} />
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
              title={<a href="https://ant.design">{item.query}</a>}
              description={`Trong ${item?.displayCategory?.name}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default AutoCompleteSearch;
