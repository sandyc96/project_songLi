let myReactRoot = ReactDOM.createRoot(document.getElementById('addEventList'));

function MyCalendar() {
  const [events, setEvents] = React.useState([]);
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [newName, setNewName] = React.useState('');

  React.useEffect(() => {
    // td為全域變數
    let td;

    // 點擊某個日期後->td
    $('#calendarDate').on('click', '.days>tr>td', function () {
      td = $(this);
    });

    // 點擊加入按鈕之後，新增日期+備註到預約訂單的下面
    $('#addWhoBtn').on('click', function () {

      // 若為空白，跳出提醒
      let eventName = $('#whoInput').val().trim();
      if (!eventName) {
        alert('請輸入行程名稱');
        return;
      }

      // 新增在月曆上的星星
      const starList = $('<span class="starList">★</span>');
      td.append(starList);

      // 定義所點擊的日期為變數
      const year = $('.year').text();
      const month = $('.month').text().padStart(2, '0');
      const day = td.children('div').text().padStart(2, '0');
      const dateList = `${year}/${month}/${day}`;
      // const dateList = `${$('.year').text()}/${$('.month').text()}/`;

      // 定義所點擊的日期+備註+星星為變數
      const newEvent = {
        date: dateList,
        // time: td.children('div').text(),
        name: eventName,
        starList: starList
      };

      setEvents(prevEvents => [...prevEvents, newEvent]);
    });


    return () => {
      $('#calendarDate').off('click', '.days>tr>td');
      $('#addWhoBtn').off('click');
    };
  }, []);

  // 編輯按鈕
  const handleEditClick = function (index, currentName) {
    setEditingIndex(index);
    setNewName(currentName);
  };

  //刪除按鈕
  const handleDeleteClick = function (index) {
    setEvents(prevEvents => {
      const updatedEvents = prevEvents.filter((_, i) => i !== index);
      prevEvents[index].starList.remove(); //把星星刪掉
      return updatedEvents;
    });
  };

  //換掉備註
  const handleNameChange = function (n) {
    setNewName(n.target.value);
  };

  //Ok按鈕
  const handleOkClick = function (index) {
    setEvents(prevEvents => prevEvents.map((event, e) =>
      e === index ? { ...event, name: newName } : event
    ));
    setEditingIndex(null);
  };
  //呈現


  // 網頁要出現的東西
  return (
    <React.Fragment>
      {events.map((event, index) => (
        <div key={index} className="clearfix">
          <li>
            {event.date}{event.time}
          </li>
          {editingIndex === index ? (
            <span>
              <input type="text" value={newName} onChange={handleNameChange} />
              <button className="float-end calendarbtn" onClick={() => handleOkClick(index)}>保存</button><br /><hr />
            </span>
          ) : (
            <span>{event.name}
              <button className="float-end calendarbtn" onClick={() => handleDeleteClick(index)}>刪除</button>
              <button className="float-end calendarbtn" onClick={() => handleEditClick(index, event.name)}>修改</button><br /><hr />
            </span>
          )}
        </div>
      ))}
    </React.Fragment>
  );
}

myReactRoot.render(<MyCalendar />);


