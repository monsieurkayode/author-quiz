import React from 'react';
import { render } from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AuthorQuiz from '../components/AuthorQuiz';

configure({ adapter: new Adapter() });

const onAnswerSelected = jest.fn();

let state = {
  turnData: {
    author: {
      name: 'Mark Twain',
      imageUrl: 'images/authors/marktwain.jpg',
      imageSource: 'Wikimedia Commons',
      books: [
        'The Adventures of Huckleberry Finn',
        'Life Of Mississippi',
        'Roughing It'
      ]
    },
    books: [
      'The Adventures of Huckleberry Finn',
      'Life Of Mississippi',
      'Roughing It'
    ],
  },
  highlight: 'none',
}

describe('Author Quiz Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected} />, div);
  });

  it('renders correctly', () => {
    const wrapper = shallow(<AuthorQuiz
      {...state}
      onAnswerSelected={onAnswerSelected}
    />)
    expect(wrapper).toMatchSnapshot();
  });

  describe('When no answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz
        {...state}
        onAnswerSelected={onAnswerSelected}
      />);
    });

    it('should have no background color', () => {
      expect(wrapper.find('div.row.turn').props().style.background)
        .toBe('');
    });
  });

  describe('When the wrong answer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      state = {...state, highlight: 'wrong'}
      wrapper = mount(<AuthorQuiz
        {...state}
        onAnswerSelected={onAnswerSelected}
      />);
    });
    
    it('should have a "#F55" background color', () => {
      expect(wrapper.find('div.row.turn').props().style.background)
        .toBe('#F55')
    });
  });

  describe('When the right amswer has been selected', () => {
    let wrapper;
    beforeAll(() => {
      state = {...state, highlight: 'right'};
      wrapper = mount(<AuthorQuiz 
        {...state}
        onAnswerSelected={onAnswerSelected}
      />);
    });

    it('should have a "#3FA" background color', () => {
      expect(wrapper.find('div.row.turn').props().style.background)
        .toBe('#3FA');
    })
  });

  describe('When the first answer is selected', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = mount(<AuthorQuiz 
        {...state}
        onAnswerSelected={onAnswerSelected}
      />);
      wrapper.find('.answer').first().simulate('click');
    });

    it('onAnswerSelected should be called', () => {
      expect(onAnswerSelected).toHaveBeenCalled();
    });

    it('should receive The Shining', () => {
      expect(onAnswerSelected)
        .toHaveBeenCalledWith('The Adventures of Huckleberry Finn');
    })
  });
});