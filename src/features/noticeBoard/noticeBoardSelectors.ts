import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

const selectNoticeBoardState = (state: RootState) => state.noticeBoard;

const selectAllItems = (state: RootState) => state.noticeBoard.items;

const selectSearchQuery = (state: RootState) => state.noticeBoard.searchQuery;

export const selectFilteredNoticeBoard = createSelector(
  [selectAllItems, selectSearchQuery],
  (items, searchQuery) => {
    if (!searchQuery) {
      return items;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    // 검색어에 맞는 항목만 필터링하여 새로운 배열로 반환
    return items.filter((item) => 
      item.reqId.toLowerCase().includes(lowerCaseQuery) ||
      item.status.toLowerCase().includes(lowerCaseQuery)
    );
  }
);