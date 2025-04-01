import React, { useEffect, useState } from "react";
import closeRightSidebar from "../../../assets/images/closeRightSidebar.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { notificationHandler } from "../../../redux/action/businessAction/notificationList";
import Loader from "../../../common/Loader/Loader";
import { useNavigate } from "react-router-dom";
import {
  markAsReadAction,
  markAsReadHandler,
} from "../../../redux/action/businessAction/markAsRead";

const NotificationDrawer = ({ notificationDrawer, setNotificationDrawer }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const notificationListSelector = useSelector(
    (state) => state?.notificationList
  );

  const markAsReadSelector = useSelector((state) => state?.markAsRead);

  useEffect(() => {
    fetchNotifications(1, true);
  }, []);

  useEffect(() => {
    if (notificationListSelector?.data?.data?.records) {
      const newNotifications = notificationListSelector?.data?.data?.records;

      setNotifications((prev) =>
        page === 1 ? newNotifications : [...prev, ...newNotifications]
      );

      // If returned records are less than limit, stop fetching
      if (newNotifications.length < 10) {
        setHasMore(false);
      }
    }
  }, [notificationListSelector]);

  useEffect(() => {
    if (markAsReadSelector?.data?.statusCode === 200) {
      dispatch(markAsReadAction.markAsReadReset());
    }
  }, [markAsReadSelector]);

  const fetchNotifications = (currentPage, reset = false) => {
    let payload = { page: currentPage, limit: 10 };
    dispatch(notificationHandler(payload));
    if (reset) setNotifications([]); // Reset when loading first page
  };

  const loadMoreNotifications = () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNotifications(nextPage);
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const createdAt = new Date(timestamp);
    const seconds = Math.floor((now - createdAt) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    for (let unit in intervals) {
      const value = Math.floor(seconds / intervals[unit]);
      if (value >= 1) {
        return value === 1 ? `1 ${unit} ago` : `${value} ${unit}s ago`;
      }
    }
    return "Just now";
  };

  const navigateToNotification = (notification) => {
    let payload = {
      notificationIds: [notification?._id],
      isReadAll: false,
    };
    dispatch(markAsReadHandler(payload));
    if (notification?.notificationType === 30) {
      navigate("/merchant/nudges", { state: notification });
      setNotificationDrawer(false);
    } else if (notification?.notificationType === 10) {
      navigate("/merchant/followers");
      setNotificationDrawer(false);
    }
  };

  return (
    <>
      {(notificationListSelector?.isLoading ||
        markAsReadSelector?.isLoading) && <Loader />}
      {notificationDrawer && (
        <div
          className="overlay2"
          onClick={() => setNotificationDrawer(false)}
        ></div>
      )}

      <div className={`rightSidebar ${notificationDrawer ? "open" : ""}`}>
        <div className="d-flex justify-between align-center">
          <div className="fs-20 fw-600">Notification</div>
          <div
            className="closeSidebar"
            onClick={() => setNotificationDrawer(false)}
          >
            <img src={closeRightSidebar} alt="closeRightSidebar" />
          </div>
        </div>
        <div className="divider2"></div>
        <div className="overflowSidebar" id="scrollableDiv">
          <InfiniteScroll
            dataLength={notifications.length}
            next={loadMoreNotifications}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>No more notifications</b>
              </p>
            }
            scrollableTarget="scrollableDiv"
          >
            {notifications?.map((notification) => (
              <div
                className={
                  notification?.isRead === false
                    ? "isRead cursor-pointer"
                    : "cursor-pointer"
                }
                key={notification.id}
                onClick={() => navigateToNotification(notification)}
              >
                <div className="d-flex align-center mb-10 gap-12">
                  <div className="fs-16 fw-600">{notification.title}</div>
                </div>
                <div className="fs-16 fw-100 mb-12">{notification.message}</div>
                <div className="fs-16 fw-100 o5">
                  {timeAgo(notification?.createdAt)}
                </div>

                <div className="divider"></div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
};

export default NotificationDrawer;
