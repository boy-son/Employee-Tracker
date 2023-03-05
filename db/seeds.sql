INSERT INTO department (name)
VALUES
    ("Sales"),
    ("Marketing"),
    ("Legal"),
    ("Finance");

    INSERT INTO role (title, salary, department_id)
    VALUES
        ("Sales Lead", 90000, 1),
        ("Marketing Analyst", 70000, 2),
        ("Lawyer", 200000, 3),
        ("Accountant", 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, NULL),
    ("Jane", "Doe", 2, NULL),
    ("Bob", "Smith", 3, NULL),
    ("Craig", "Roberts", 4, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES

        ("Mark", "Hoppus", 4, 4),
        ("John", "Johnson", 1, 1),
        ("Lucas", "Baker", 2, 2),
        ("Brutus", "Gardner", 3, 3),
        ("Ferdinand", "Franz", 3, 4),
        ("Howard", "Parker", 2, 2),
        ("Harriet", "Pursley", 2, 2);

