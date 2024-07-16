// resources/js/calendar-widget.js
function calendarWidget({
  view = "dayGridMonth",
  locale = "en",
  firstDay = 1,
  events = [],
  eventContent = null,
  selectable = false,
  onEventClick = false,
  dayMaxEvents = false,
  moreLinkContent = null,
  resources = [],
  hasContextMenu = false,
  options = {}
}) {
  return {
    calendarEl: null,
    init: async function() {
      this.calendarEl = this.$el;
      let self = this;
      let settings = {
        view,
        resources,
        eventSources: [
          {
            events: (fetchInfo, successCallback, failureCallback) => {
              return this.$wire.getEventsJs(fetchInfo);
            }
          }
        ],
        locale,
        firstDay,
        dayMaxEvents,
        selectable: hasContextMenu,
        editable: false,
        eventStartEditable: false,
        eventDurationEditable: false,
        eventClick: (info) => {
          if (info.event.extendedProps.url) {
            const target = info.event.extendedProps.url_target ?? "_blank";
            window.open(info.event.extendedProps.url, target);
          } else if (onEventClick) {
            this.$wire.onEventClick(info);
          }
        }
      };
      if (hasContextMenu) {
        settings.dateClick = (info) => {
          self.$el.querySelector("[calendar-context-menu]").dispatchEvent(new CustomEvent("calendar--open-menu", {
            detail: info
          }));
        };
        settings.select = (info) => {
          const target = info.jsEvent.target;
          self.$el.querySelector("[calendar-context-menu]").dispatchEvent(new CustomEvent("calendar--open-menu", {
            detail: info
          }));
        };
      }
      if (eventContent !== null) {
        settings.eventContent = (info) => {
          return {
            html: self.getEventContent(info)
          };
        };
      }
      if (moreLinkContent !== null) {
        settings.moreLinkContent = (arg) => {
          return {
            html: self.getMoreLinkContent(arg)
          };
        };
      }
      this.ec = new EventCalendar(this.$el.querySelector("div"), {
        ...settings,
        ...options
      });
      window.addEventListener("ec-add-event", this.addEvent);
      window.addEventListener("calendar--refresh", () => this.ec.refetchEvents());
    },
    addEvent: function(event) {
      this.ec.addEvent(event);
    },
    getEventContent: function(info) {
      if (typeof eventContent === "string") {
        return this.wrapContent(eventContent, info);
      }
      if (typeof eventContent === "object") {
        const model = info.event.extendedProps.model;
        const content = eventContent[model];
        return this.wrapContent(content, info);
      }
    },
    getMoreLinkContent: function(info) {
      return this.wrapContent(moreLinkContent, info);
    },
    wrapContent: function(content, info) {
      let container = document.createElement("div");
      container.innerHTML = content;
      container.setAttribute("x-data", JSON.stringify(info));
      container.classList.add("w-full");
      return container.outerHTML;
    }
  };
}
export {
  calendarWidget as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVzb3VyY2VzL2pzL2NhbGVuZGFyLXdpZGdldC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2FsZW5kYXJXaWRnZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcgPSAnZGF5R3JpZE1vbnRoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbGUgPSAnZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0RGF5ID0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudHMgPSBbXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudENvbnRlbnQgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGFibGUgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkV2ZW50Q2xpY2sgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXlNYXhFdmVudHMgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JlTGlua0NvbnRlbnQgPSBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc291cmNlcyA9IFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc0NvbnRleHRNZW51ID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkge1xuICAgIHJldHVybiB7XG5cbiAgICAgICAgY2FsZW5kYXJFbDogbnVsbCxcblxuICAgICAgICBpbml0OiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGVuZGFyRWwgPSB0aGlzLiRlbDtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICB2aWV3OiB2aWV3LFxuICAgICAgICAgICAgICAgIHJlc291cmNlczogcmVzb3VyY2VzLFxuICAgICAgICAgICAgICAgIGV2ZW50U291cmNlczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudHM6IChmZXRjaEluZm8sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHdpcmUuZ2V0RXZlbnRzSnMoZmV0Y2hJbmZvKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgICAgICAgICBmaXJzdERheTogZmlyc3REYXksXG4gICAgICAgICAgICAgICAgZGF5TWF4RXZlbnRzOiBkYXlNYXhFdmVudHMsXG4gICAgICAgICAgICAgICAgc2VsZWN0YWJsZTogaGFzQ29udGV4dE1lbnUsXG4gICAgICAgICAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGV2ZW50U3RhcnRFZGl0YWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZXZlbnREdXJhdGlvbkVkaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBldmVudENsaWNrOiAoaW5mbykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5mby5ldmVudC5leHRlbmRlZFByb3BzLnVybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gaW5mby5ldmVudC5leHRlbmRlZFByb3BzLnVybF90YXJnZXQgPz8gJ19ibGFuayc7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihpbmZvLmV2ZW50LmV4dGVuZGVkUHJvcHMudXJsLCB0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9uRXZlbnRDbGljaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kd2lyZS5vbkV2ZW50Q2xpY2soaW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoaGFzQ29udGV4dE1lbnUpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5kYXRlQ2xpY2sgPShpbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsLnF1ZXJ5U2VsZWN0b3IoJ1tjYWxlbmRhci1jb250ZXh0LW1lbnVdJykuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NhbGVuZGFyLS1vcGVuLW1lbnUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IGluZm8sXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnNlbGVjdCA9IChpbmZvKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGluZm8uanNFdmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuJGVsLnF1ZXJ5U2VsZWN0b3IoJ1tjYWxlbmRhci1jb250ZXh0LW1lbnVdJykuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2NhbGVuZGFyLS1vcGVuLW1lbnUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWw6IGluZm8sXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZXZlbnRDb250ZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MuZXZlbnRDb250ZW50ID0gKGluZm8pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHNlbGYuZ2V0RXZlbnRDb250ZW50KGluZm8pLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1vcmVMaW5rQ29udGVudCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLm1vcmVMaW5rQ29udGVudCA9IChhcmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGh0bWw6IHNlbGYuZ2V0TW9yZUxpbmtDb250ZW50KGFyZyksXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVjID0gbmV3IEV2ZW50Q2FsZW5kYXIodGhpcy4kZWwucXVlcnlTZWxlY3RvcignZGl2JyksIHtcbiAgICAgICAgICAgICAgICAuLi5zZXR0aW5ncyxcbiAgICAgICAgICAgICAgICAuLi5vcHRpb25zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlYy1hZGQtZXZlbnQnLCB0aGlzLmFkZEV2ZW50KTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjYWxlbmRhci0tcmVmcmVzaCcsICgpID0+IHRoaXMuZWMucmVmZXRjaEV2ZW50cygpKVxuICAgICAgICB9LFxuXG4gICAgICAgIGFkZEV2ZW50OiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuZWMuYWRkRXZlbnQoZXZlbnQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEV2ZW50Q29udGVudDogZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnRDb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndyYXBDb250ZW50KGV2ZW50Q29udGVudCwgaW5mbyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXZlbnRDb250ZW50ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGVsID0gaW5mby5ldmVudC5leHRlbmRlZFByb3BzLm1vZGVsO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBldmVudENvbnRlbnRbbW9kZWxdO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndyYXBDb250ZW50KGNvbnRlbnQsIGluZm8pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldE1vcmVMaW5rQ29udGVudDogZnVuY3Rpb24gKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndyYXBDb250ZW50KG1vcmVMaW5rQ29udGVudCwgaW5mbyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgd3JhcENvbnRlbnQ6IGZ1bmN0aW9uIChjb250ZW50LCBpbmZvKSB7XG4gICAgICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gY29udGVudDtcblxuICAgICAgICAgICAgLy8gQWRkIGFscGluZSBkYXRhIGFuZCBjbGFzc2VzXG4gICAgICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCd4LWRhdGEnLCBKU09OLnN0cmluZ2lmeShpbmZvKSk7XG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZCgndy1mdWxsJyk7XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgbW9kaWZpZWQgSFRNTFxuICAgICAgICAgICAgcmV0dXJuIGNvbnRhaW5lci5vdXRlckhUTUw7XG4gICAgICAgIH0sXG4gICAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFlLFNBQVIsZUFBZ0M7QUFBQSxFQUNJLE9BQU87QUFBQSxFQUNQLFNBQVM7QUFBQSxFQUNULFdBQVc7QUFBQSxFQUNYLFNBQVMsQ0FBQztBQUFBLEVBQ1YsZUFBZTtBQUFBLEVBQ2YsYUFBYTtBQUFBLEVBQ2IsZUFBZTtBQUFBLEVBQ2YsZUFBZTtBQUFBLEVBQ2Ysa0JBQWtCO0FBQUEsRUFDbEIsWUFBWSxDQUFDO0FBQUEsRUFDYixpQkFBaUI7QUFBQSxFQUNqQixVQUFVLENBQUM7QUFDZixHQUFHO0FBQ3RDLFNBQU87QUFBQSxJQUVILFlBQVk7QUFBQSxJQUVaLE1BQU0saUJBQWtCO0FBQ3BCLFdBQUssYUFBYSxLQUFLO0FBQ3ZCLFVBQUksT0FBTztBQUNYLFVBQUksV0FBVztBQUFBLFFBQ1g7QUFBQSxRQUNBO0FBQUEsUUFDQSxjQUFjO0FBQUEsVUFDVjtBQUFBLFlBQ0ksUUFBUSxDQUFDLFdBQVcsaUJBQWlCLG9CQUFvQjtBQUNyRCxxQkFBTyxLQUFLLE1BQU0sWUFBWSxTQUFTO0FBQUEsWUFDM0M7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsWUFBWTtBQUFBLFFBQ1osVUFBVTtBQUFBLFFBQ1Ysb0JBQW9CO0FBQUEsUUFDcEIsdUJBQXVCO0FBQUEsUUFDdkIsWUFBWSxDQUFDLFNBQVM7QUFDbEIsY0FBSSxLQUFLLE1BQU0sY0FBYyxLQUFLO0FBQzlCLGtCQUFNLFNBQVMsS0FBSyxNQUFNLGNBQWMsY0FBYztBQUN0RCxtQkFBTyxLQUFLLEtBQUssTUFBTSxjQUFjLEtBQUssTUFBTTtBQUFBLFVBQ3BELFdBQVcsY0FBYztBQUNyQixpQkFBSyxNQUFNLGFBQWEsSUFBSTtBQUFBLFVBQ2hDO0FBQUEsUUFDSjtBQUFBLE1BQ0o7QUFFQSxVQUFJLGdCQUFnQjtBQUNoQixpQkFBUyxZQUFXLENBQUMsU0FBUztBQUMxQixlQUFLLElBQUksY0FBYyx5QkFBeUIsRUFBRSxjQUFjLElBQUksWUFBWSx1QkFBdUI7QUFBQSxZQUNuRyxRQUFRO0FBQUEsVUFDWixDQUFDLENBQUM7QUFBQSxRQUNOO0FBQ0EsaUJBQVMsU0FBUyxDQUFDLFNBQVM7QUFDeEIsZ0JBQU0sU0FBUyxLQUFLLFFBQVE7QUFDNUIsZUFBSyxJQUFJLGNBQWMseUJBQXlCLEVBQUUsY0FBYyxJQUFJLFlBQVksdUJBQXVCO0FBQUEsWUFDbkcsUUFBUTtBQUFBLFVBQ1osQ0FBQyxDQUFDO0FBQUEsUUFDTjtBQUFBLE1BQ0o7QUFFQSxVQUFJLGlCQUFpQixNQUFNO0FBQ3ZCLGlCQUFTLGVBQWUsQ0FBQyxTQUFTO0FBQzlCLGlCQUFPO0FBQUEsWUFDSCxNQUFNLEtBQUssZ0JBQWdCLElBQUk7QUFBQSxVQUNuQztBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBRUEsVUFBSSxvQkFBb0IsTUFBTTtBQUMxQixpQkFBUyxrQkFBa0IsQ0FBQyxRQUFRO0FBQ2hDLGlCQUFPO0FBQUEsWUFDSCxNQUFNLEtBQUssbUJBQW1CLEdBQUc7QUFBQSxVQUNyQztBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBRUEsV0FBSyxLQUFLLElBQUksY0FBYyxLQUFLLElBQUksY0FBYyxLQUFLLEdBQUc7QUFBQSxRQUN2RCxHQUFHO0FBQUEsUUFDSCxHQUFHO0FBQUEsTUFDUCxDQUFDO0FBQ0QsYUFBTyxpQkFBaUIsZ0JBQWdCLEtBQUssUUFBUTtBQUNyRCxhQUFPLGlCQUFpQixxQkFBcUIsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDO0FBQUEsSUFDOUU7QUFBQSxJQUVBLFVBQVUsU0FBVSxPQUFPO0FBQ3ZCLFdBQUssR0FBRyxTQUFTLEtBQUs7QUFBQSxJQUMxQjtBQUFBLElBRUEsaUJBQWlCLFNBQVUsTUFBTTtBQUM3QixVQUFJLE9BQU8saUJBQWlCLFVBQVU7QUFDbEMsZUFBTyxLQUFLLFlBQVksY0FBYyxJQUFJO0FBQUEsTUFDOUM7QUFFQSxVQUFJLE9BQU8saUJBQWlCLFVBQVU7QUFDbEMsY0FBTSxRQUFRLEtBQUssTUFBTSxjQUFjO0FBQ3ZDLGNBQU0sVUFBVSxhQUFhLEtBQUs7QUFDbEMsZUFBTyxLQUFLLFlBQVksU0FBUyxJQUFJO0FBQUEsTUFDekM7QUFBQSxJQUNKO0FBQUEsSUFFQSxvQkFBb0IsU0FBVSxNQUFNO0FBQ2hDLGFBQU8sS0FBSyxZQUFZLGlCQUFpQixJQUFJO0FBQUEsSUFDakQ7QUFBQSxJQUVBLGFBQWEsU0FBVSxTQUFTLE1BQU07QUFDbEMsVUFBSSxZQUFZLFNBQVMsY0FBYyxLQUFLO0FBQzVDLGdCQUFVLFlBQVk7QUFHdEIsZ0JBQVUsYUFBYSxVQUFVLEtBQUssVUFBVSxJQUFJLENBQUM7QUFDckQsZ0JBQVUsVUFBVSxJQUFJLFFBQVE7QUFHaEMsYUFBTyxVQUFVO0FBQUEsSUFDckI7QUFBQSxFQUNKO0FBQ0o7IiwKICAibmFtZXMiOiBbXQp9Cg==
