/**
 * Initiate global data for the dynamic table
 *
 */
let max = DEFAULT_MAX_ROW_NUMBER,
	page = 1,
	numberOfPage = 1,
	checkBoxUndeterministic = "";

/**
 * getting table cookie data
 */
let nowURL = window.location.href.split('?')[0];
if (getCookie("tableMaxRowIndex" + nowURL) != "") {
	max = getCookie("tableMaxRowIndex" + nowURL);
	initMaxRow();
}
if (getCookie("tablePageIndex" + nowURL) != "") page = getCookie("tablePageIndex" + nowURL);

/**
 * Getting default data
 *
 */
$(document).ready(function () {
	updateData();
});

/**
 * Variable for three state checkbox
 */
let $check = $("input[type=checkbox].filter"),
	el;

/**
 * Update the checkBoxUndeterministic variable as checkbox status
 * @param {event} click event on the checkbox
 * @return {null} the final state, checkBoxUndeterministic will be filled with correspond query
 */
$check
	.data('checked', 0)
	.click(function (e) {

		el = $(this);

		switch (el.data('checked')) {

			// unchecked, going indeterminate
			case 0:
				el.data('checked', 1);
				el.prop('indeterminate', true);
				checkBoxUndeterministic = "";
				break;

				// indeterminate, going checked
			case 1:
				el.data('checked', 2);
				el.prop('indeterminate', false);
				el.prop('checked', true);
				checkBoxUndeterministic = "1";
				break;

				// checked, going unchecked
			default:
				el.data('checked', 0);
				el.prop('indeterminate', false);
				el.prop('checked', false);
				checkBoxUndeterministic = "0";
		}

	});

/**
 * Update the tableData variable as user change filter
 * @param {event} change event on one of the input tag with filter class
 * @return {null} the final state, data in table will be updated as at the correspond query
 */
$('input.filter').change(function (event) {
	page = 1;
	updateData();
});

/**
 * Update the tableData variable as user change data page
 * @param {event} click event on one of the 'li a' tag inside element with 'pagination' id
 * @return {null} the final state, data in table will be updated as at the correspond page and query
 */
$("body").on("click", "#pagination li a", function () {
	event.preventDefault();
	let click = $(this).html();
	if (click === "«" && page > 1) {
		page -= 1;
	} else if (click === "»" && page < numberOfPage) {
		page += 1;
	} else if (!isNaN(parseInt(click))) {
		page = parseInt(click);
	}
	updateData();
});

/**
 * Update the tableData variable as user change max row in table
 * @param {event} click event on one of the 'li' tag inside element with 'maxRow' id
 * @return {null} the final state, data in table will be updated as at the correspond number of row and query
 */
$("body").on("click", "#maxRow li", function () {
	// halting the default execution
	event.preventDefault();

	// changing active class
	$('#maxRow .active').removeClass("active");
	$(this).addClass("active");

	// update the max row value with the clicked value
	max = parseInt($(this).find("a").html());

	// set page to default
	page = 1;

	// update data
	updateData();
});

/**
 * Initiating Max Row button to select the latest max row saved in cookie
 */
function initMaxRow() {
	let maxRowButton = $('#maxRow').find('li');

	// changing active class
	$('#maxRow .active').removeClass("active");
	maxRowButton.each(function (index) {
		if (parseInt($(this).find('a').html()) == max) {
			$(this).addClass("active");
		}
	})
}

/**
 * Update the tableData variable trigger the re-render table function
 * @param {null} can be called anytime as long as 'page' and 'max' variable value is valid
 * @return {null} the final state, data in table will be updated as the current state (filter, page and max)
 */
function updateData() {
	// getting the data
	let data = {
		classroomName: $('#fullname').val(),
		shortName: $('#shortName').val(),
		location: $('#location').val(),
		capacity: $('#capacity').val(),
		isActive: checkBoxUndeterministic,
		page: page,
		max: max
	};

	// ajax to the Client API supplier
	$.ajax({
		type: 'GET',
		dataType: 'json',
		data: data,
		url: mta.server + 'ClassroomController/gets',
		error: function (xhr, ajaxOptions, thrownError) {
			if (xhr.status !== 200) {
				alert("ERROR (" + xhr.status + ") : " + thrownError);
			}
			console.log(data);
			console.log("ERROR (" + xhr.status + ") : " + thrownError);
		},
		success: function (result) {
			if (result.status || result.message == 'No data returned') {
				tableData = result.data.data;
				numberOfPage = result.data.page;
				updateTable();
				updatePagination();

				if (typeof tableData === 'undefined') {
					Swal.fire({
						type: 'error',
						title: 'Can\'t Find Data',
						text: result.message
					});
				}

				setCookie("tablePageIndex" + nowURL, page, 2);
				setCookie("tableMaxRowIndex" + nowURL, max, 2);
			} else {
				Swal.fire({
					type: 'error',
					title: 'Oops...',
					text: result.message
				});
			}
		}
	});
}

/**
 * Render the table using data in tableData
 * @param {null} can be called anytime
 * @return {null} the final state, data in 'tbody-classroom' table will be updated to correspond state
 */
function updateTable() {
	let tableBody = document.getElementById('tbody-classroom');
	if (tableBody != null) {
		tableBody.innerHTML = "";

		if (typeof tableData !== 'undefined') {
			tableData.forEach(classroom => {
				let active = "";
				(classroom.isActive == 0) ? active = "No": active = "Yes";
				let lastUpdated = (classroom.updatedAt) ? classroom.updatedAt : classroom.createdAt;
				let temp =
					"<tr>" +
					"   <td>" + classroom.classroomName + "</td> " +
					"   <td>" + classroom.location + "</td> " +
					"   <td>" + classroom.capacity + "</td> " +
					"   <td class='text-center'>" + active + "</td> " +
					"   <td>" + classroom.creatorName + "</td> " +
					"   <td>" + classroom.updaterName + "</td> " +
					"   <td>" + lastUpdated + "</td> " +
					"   <td>" +
					"       <a href='" + mta.server + "classroom/edit/" + classroom.classroomId + "' " +
					"           data-toggle='tooltip' data-placement='top' title='Edit'> " +
					"           <i class='fa fa-edit fa-action'></i></a>" +
					"       <a href='#' onclick='openModal(" + classroom.classroomId + ", \"" + classroom.shortName + "\")'" +
					"           data-toggle='tooltip' data-placement='top' title='Delete'>" +
					"           <i class='fa fa-trash-o fa-action'></i></a>" +
					"   </td>" +
					"</tr>";
				tableBody.innerHTML += temp;
			});
		}
	}

	$('[data-toggle="tooltip"]').tooltip();
}

/**
 * Render the table pagination correspond to 'page' and 'numberOfPage' value
 * @param {null} can be called anytime
 * @return {null} the final state, view in '#numberOfPage' will be correspond to current state
 */
function updatePagination() {
	let pagination = $("#pagination");

	pagination.html("");
	if (numberOfPage > 1) {
		// determine whether the next or previous button could be click or not
		let leftArrowInactiveClass = "",
			rightArrowInactiveClass = "";

		if (page == 1) { // the page is on the first so previous button should be disabled
			leftArrowInactiveClass = "disabled";
		} else if (page == numberOfPage) { // the page is on the last so next button should be disabled
			rightArrowInactiveClass = "disabled";
		}

		// appending the previous button
		pagination.append('<li class="' + leftArrowInactiveClass + '"><a href="#">«</a></li>');
		// appending the page button
		let firstElementClass = (page == 1) ? 'active' : '';
		pagination.append('<li class="' + firstElementClass + '"><a href="#">1</a></li>');
		var i = 2;
		while (i < numberOfPage) {
			if ((page - i) > 1 && numberOfPage > 5) {
				pagination.append('<li class="disabled"><a href="#">…</a></li>');
				i = page - 2;
			} else if ((i - page) > 1 && numberOfPage > 5) {
				pagination.append('<li class="disabled"><a href="#">…</a></li>');
				i = numberOfPage;
			} else if (i == page) {
				pagination.append('<li class="active"><a href="#">' + i + '</a></li>');
			} else {
				pagination.append('<li><a href="#">' + i + '</a></li>');
			}

			i++;
		}
		let lastElementClass = (page == numberOfPage) ? 'active' : '';
		pagination.append('<li class="' + lastElementClass + '"><a href="#">' + numberOfPage + '</a></li>');
		// appending the next button
		pagination.append('<li class="' + rightArrowInactiveClass + '"><a href="#">»</a></li>');
	}
}

/**
 * Opening modal for delete confirmation
 * @return {null} the final state, modal delete confirmation will be shown with the
 * name of classroom that will be deleted
 * @param ID the classroom ID to be deleted
 * @param Shortname the classroom Shortname to be deleted
 */
function openModal(ID, Shortname) {
	Swal.fire({
		title: '<div>' +
			'<h1>Deleting ' + Shortname + '</h1>' +
			'<h4>Are you sure?</h4>' +
			'</div>',
		text: "You won't be able to revert this",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it'
	}).then((result) => {
		if (result.value) {
			console.log("delete it!");

			showLoading();
			// getting the data
			let data = {
				classroomId: ID,
				isDeleted: 1
			};

			// ajax to the Client API supplier
			$.ajax({
				type: 'PUT',
				dataType: 'json',
				data: JSON.stringify(data),
				url: mta.server + 'ClassroomController/put',
				error: function (xhr, ajaxOptions, thrownError) {
					Swal.fire({
						type: 'error',
						title: 'Oops...',
						text: 'Something went wrong!'
					});
					if (xhr.status !== 200) {
						alert("ERROR (" + xhr + ") : " + thrownError);
					}
					console.log(data);
					console.log("ERROR (" + xhr + ") : " + thrownError);
				},
				success: function (result) {
					if (result.status) {
						Swal.fire(
							'Deleted!',
							result.message,
							'success'
						);
						updateData();
					} else {
						Swal.fire({
							type: 'error',
							title: 'Oops...',
							text: result.message
						});
					}
					hideLoading();
				}
			});
		}
	});
}
